var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var mockResponse = require('../mocks/Response');
var mockRequest = require('../mocks/Request');

var EventsController = require('../../controllers/EventsController');

describe('Events Controller', function () {

	var eventsCtrl;

	beforeEach(function(){

	});

	afterEach(function(){

	});

	it('Handle handshake for incoming events',function(done){

		var testHeaderValue = 'fakeHeaderValue';

		mockRequest.set('X-Hook-Secret',testHeaderValue);
		eventsCtrl = new EventsController(mockRequest,mockResponse);

		eventsCtrl.onIncomingEvents();

		expect(mockResponse.get('X-Hook-Secret')).toBe(testHeaderValue);
		expect(mockResponse._status).toBe(200);
		done();

	});

});