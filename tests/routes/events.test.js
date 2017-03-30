var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');
const bodyParser = require('body-parser');
var io;

const eventsController = require('../../controllers/EventsController');

describe('Events route', function () {

	var app,
		request,
		route;

	beforeEach(function () {

		app = express();
		app.use( bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		request = supertest(app);
		io = require('socket.io')(request);
		route = proxyquire('../../routes/events', {})(app,io);


	});

	afterEach(function(){
	});


	it('Should handshake in-flight webhook creation requests', function (done) {

		var xHookSecretValue = "ABCDE";

		request
			.post('/events/incoming/123')
			.set('X-Hook-Secret', xHookSecretValue)
			.field('events', [])
			.send({events:[]})
			.end(function(err,res){
				expect(res.statusCode).toBe(200);
				expect(res.header['x-hook-secret']).toBe(xHookSecretValue);
				done();
			});

	});


	it('Should pass event handling to eventController when X-Hook-Secret header is not present', function (done) {

		request
			.post('/events/incoming/123')
			.send({events:[]})
			.end(function(err,res){
				expect(res.statusCode).toBe(200);
				done();}
			);

	});

});