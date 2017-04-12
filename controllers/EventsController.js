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
	}

	handshake(){

		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');

		//Store webhook secret for validatin incoming event request
		mongodb.getConnection();
		new AWMWebhook({
			resource_id: this.request().params.resourceId,
			secret: xHookSecret


	}

	handle(){


		mongodb.getConnection();









}

module.exports = EventsController;