const router = require('express').Router();
const path    = require("path");
const asanaClient = require('../helpers/asanaClient');

router.post('/incoming/:resourceId',function(req,res,next){

	const eventsController = require('../controllers/events');
	var eventsCtrl =  new eventsController(req,res);


	//Psuedo code

	/**
	 * if (request.isWebhookHandshake()) { //shake hands }
	 * else if (request.hasIncomingEvents()) {
	 *  if (request. )
	 * }
	 * else {
	 *  //Unknown request
	 * }
	 *
	 */



	//Confirm new webhooks in-flight for requests with X-Hook-Secret header
	if (req.get('X-Hook-Secret') != null)
	{
		return eventsCtrl.handshake();
	}
	//Pass incoming events payload to AWM events handler
	else
	{
		return eventsCtrl.handle();
	}

});

module.exports = router;