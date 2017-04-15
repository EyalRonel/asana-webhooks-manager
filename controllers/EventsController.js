'use strict';

const AWMController = require('./AWMController');
const AWMEvent = require('../models/event');
const AWMWebhook = require('../models/webhook');
const CryptoJS = require("crypto-js");
const mongodb = require('../helpers/mongodbHelper');

class EventsController extends AWMController {

	constructor(req, res,io) {
		super(req, res);

		this.socket = io.of('/events');

	}

	onIncomingEvents(){

		if (this.request().get('X-Hook-Secret') != null) return this.handshake();
		else if (this.request().get('X-Hook-Signature') != null) return this.handle();
		else return this.reply(403,{});

	}

	handshake(){

		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');

		//Store webhook secret for validating incoming event request
		mongodb.getConnection();
		return new AWMWebhook({
			resource_id: this.request().params.resourceId,
			secret: xHookSecret
		}).save()
			.then(function(){
				//Response to in-flight webhook creation request
				this.response().set('X-Hook-Secret',xHookSecret);
				return this.reply(200,{});
			}.bind(this))
			.catch();



	}

	handle(){
		
		//Verify signature header exists
		var xHookSignatureHeader = this.request().get('X-Hook-Signature');
		if (xHookSignatureHeader == null) return this.reply(403,{},"Unauthorized request");

		//Verify webhook is listed internally
		mongodb.getConnection();
		return AWMWebhook.findOne({resource_id: this.request().params.resourceId.toString()}).exec().then(function(webhook){

			//Webhook was not found, deny request
			if (typeof webhook == "undefined" || webhook == null || webhook.length == 0) return this.reply(400, {},"Unknown webhook");

			//Match encrypted request payload against header header, using secret from original webhook handshake
			var encryptedRequestBody = CryptoJS.HmacSHA256(JSON.stringify(this.request().body),webhook.secret).toString();
			if (xHookSignatureHeader !== encryptedRequestBody) return this.reply(403,{},"Unauthorized request");
      else {

				//At this point the request is fully validated and can be processed
				var eventsArray = this.request().body.events;
				AWMEvent.insertMany(eventsArray, function(error, docs) {});

				this.socket.emit('events', this.request().body.events);

				return this.reply(200,{});
			}
		}.bind(this));

	}

}

module.exports = EventsController;