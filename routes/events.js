const router = require('express').Router();
const EventsController = require('../controllers/EventsController');
var   eventsCtrl = null;

router.all('/*',function(req,res,next){

	eventsCtrl = new EventsController(req,res);

	if (eventsCtrl instanceof EventsController) {
		next();
	}

});

router.post('/incoming/:resourceId',function(req,res,next){

	return eventsCtrl.onIncomingEvents();

});

module.exports = router;