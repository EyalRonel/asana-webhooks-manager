var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');
const bodyParser = require('body-parser');
var io;

const EventsController = require('../../controllers/EventsController');

describe('Events route', function () {

	var app,
		request,
		route,
		sandbox,
		onIncomingEventsStub;

	beforeEach(function () {

		sandbox = sinon.sandbox.create();
		onIncomingEventsStub = sandbox.stub(EventsController.prototype,'onIncomingEvents');

		app = express();
		app.use( bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		request = supertest(app);
		io = require('socket.io')(request);
		route = proxyquire('../../routes/events', {'../controllers/EventsController':onIncomingEventsStub})(app,io);

	});

	afterEach(function(){

		sandbox.restore();

	});


	it('Should pass event handling to eventController', function (done) {

		var xHookSecretValue = "ABCDE";

		request
			.post('/events/incoming',{resourceId:'123456'})
			.set('X-Hook-Secret', xHookSecretValue)
			.field('events', [])
			.send({events:[]})
			.end(function(err,res){
				expect(onIncomingEventsStub.calledOnce).toBeTruthy();
				done();
			});

	});

});