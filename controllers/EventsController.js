'use strict';

const AWMController = require('./AWMController');
const AWMEvent = require('../models/event');
const AWMWebhook = require('../models/webhook');
const mongodb = require('../helpers/mongodbHelper');

class EventsController extends AWMController {

	constructor(req, res,io) {
		super(req, res);

		this.socket = io.of('/events');

	}

	onIncomingEvents(){
		if (this.request().get('X-Hook-Secret') != null) return this.handshake();
		else return this.handle();
	}

	handshake(){

		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');

		//Store webhook secret for validatin incoming event request
		mongodb.getConnection();
		new AWMWebhook({
			resource_id: this.request().params.resourceId,
			secret: xHookSecret
		}).save();

		//Response to in-flight webhook creation request
		this.response().set('X-Hook-Secret',xHookSecret);
		return this.reply(200,{});

	}

	handle(){

		var xHookSignature = this.request().get('X-Hook-Signature');

		mongodb.getConnection();

		var eventsArray = this.request().body.events;

		console.log(eventsArray);

		AWMEvent.insertMany(eventsArray, function(error, docs) {
			//if (error)
		});


		this.socket.emit('events', this.request().body.events);

		return this.reply(200,{});
	}



}

module.exports = EventsController;