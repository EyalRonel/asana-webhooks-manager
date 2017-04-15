var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var mockResponse = require('../mocks/Response');
var mockRequest = require('../mocks/Request');
var mockIO = require('../mocks/io');
var mockMongoDB = require('../mocks/mongodb');

var AWMWebhook = require('../../models/webhook');

var EventsController = proxyquire('../../controllers/EventsController',{'../helpers/mongodbHelper':mockMongoDB});

describe('Events Controller', function () {

	var eventsCtrl,
			sandbox;

	beforeEach(function() {
		mockRequest.headers = {};
		mockRequest.params = {};
		mockRequest.cookies = {};
		mockRequest.body = {};
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){

		sandbox.restore();

	});

	it('should block signed event payloads that do not pass signature verification',function(done){

		//Stub find method
		var webhookStub = {secret:"fakeSecret"};
		var AWMWebhookStub = sandbox.stub(AWMWebhook,'findOne').callsFake(function(){
			return {
				exec:function(){
					return new Promise(function(resolve,reject){
							resolve(webhookStub);
					});
				}
			};
		});


		var testHeaderValue = 'bAdSigntueV4lu3';

		mockRequest.set('X-Hook-Signature',testHeaderValue);
		mockRequest.params.resourceId = "123456";
		mockRequest.body  = { events: [] };


		var EventsController = proxyquire('../../controllers/EventsController',
			{
				'../helpers/mongodbHelper':mockMongoDB,
				'../models/webhook':AWMWebhookStub
			});

		eventsCtrl = new EventsController(mockRequest,mockResponse,mockIO);

		eventsCtrl.onIncomingEvents().then(function(response){
			expect(mockResponse._status).toBe(403);
			done();
		});


	});

	//it('should handle handshake for in-flight webhook creation requests',function(done){
	//
	//	//Stub save method
	//	sandbox.stub(AWMWebhook.prototype,'save').callsFake(function(){
	//		return new Promise(function(resolve,reject){
	//			setTimeout(function(){resolve()},0);
	//		});
	//	});
	//
	//	var testHeaderValue = 'fakeHeaderValue';
	//
	//	mockRequest.set('X-Hook-Secret',testHeaderValue);
	//	mockRequest.params.resourceId = "123456";
	//
	//	eventsCtrl = new EventsController(mockRequest,mockResponse,mockIO);
	//
	//	eventsCtrl.onIncomingEvents()
	//		.then(function(){
	//			expect(mockResponse.get('X-Hook-Secret')).toBe(testHeaderValue);
	//			expect(mockResponse._status).toBe(200);
	//			done();
	//		})
	//});
	//
	it('should allow signed event payloads',function(done){

		var testHeaderValue = '137fc7e5e4e8b77acbc98a9d51645cab8a427844edb8de79a14e61e455972eda';
		mockRequest.set('X-Hook-Signature',testHeaderValue);
		mockRequest.params.resourceId = "123456";
		mockRequest.body  = { events: [] };

		//Stub find method
		var webhookStub = {secret:"511bbb3e37c2f779ee27de6a69578336"};
		var AWMWebhookStub = sandbox.stub(AWMWebhook,'findOne').callsFake(function(){
			return {
				exec:function(){
					return new Promise(function(resolve,reject){
						resolve(webhookStub);
					});
				}
			};
		});


		var EventsController = proxyquire('../../controllers/EventsController',
			{
				'../helpers/mongodbHelper':mockMongoDB,
				'../models/webhook':AWMWebhookStub
			});

		eventsCtrl = new EventsController(mockRequest,mockResponse,mockIO);

		eventsCtrl.onIncomingEvents().then(function(response){
			expect(mockResponse._status).toBe(200);
			done();
		});

	});

	it('should block unsigned event payloads',function(done){

		mockRequest.headers = {};
		mockRequest.params.resourceId = "123456";
		mockRequest.body = {events:[]};

		eventsCtrl.onIncomingEvents();

		expect(mockResponse._status).toBe(403);
		done();

	});


});