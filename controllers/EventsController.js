'use strict';

const AWMController = require('./AWMController');

class EventsController extends AWMController {

	constructor(req, res, io) {
		super(req, res);

		this.socket = io;

	}

	onIncomingEvents(){
		if (this.request().get('X-Hook-Secret') != null) return this.handshake();
		else return this.handle();
	}

	handshake(){

		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');
		this.response().set('X-Hook-Secret',xHookSecret);
		return this.reply(200,{});

	}

	handle(){
		//console.log(this.request().body.events);
		this.socket.emit('events', this.request().body.events);

		return this.reply(200,{});
	}



}

module.exports = EventsController;