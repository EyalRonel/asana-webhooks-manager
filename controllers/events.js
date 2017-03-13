const AWMController = require('./AWMController');

class EventsController extends AWMController {

	constructor(req, res) {
		super(req, res);
	}


	handshake(){

		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');
		this.response().set('X-Hook-Secret',xHookSecret);
		return this.response().status(200).json({sts:'ok'});

	}

	handle(){
		console.log('------------');
		console.log(this.request().body.events);
		console.log('------------');
		return this.response().status(200).json({sts:'ok'});
	}



}

module.exports = EventsController;