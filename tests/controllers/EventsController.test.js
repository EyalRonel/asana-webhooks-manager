var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var EventsController = require('../../controllers/EventsController');

describe('Events Controller', function () {

	var eventsCtrl,
		mockRequest,
		mockResponse;

	beforeEach(function(){

		mockRequest = {

			_headers:{},

			get:function(key){
				if (this._headers.hasOwnProperty(key)) return this._headers[key];
				else return null;
			},
			set:function(key,val){
				this._headers[key] = val;
				return this;
			}
		};


		mockResponse = {

			_status:null,
			_json:null,
			_redirectUrl:null,
			_cookies:{},
			_headers:{},
			_sendFile:null,

			status:function(code){
				this._status = code;
				return this;
			},
			json:function(hash){
				this._json = hash;
				return this;
			},
			redirect:function(redirectUrl){
				this._redirectUrl = redirectUrl;
				return this;
			},
			cookie:function(key,val,options){
				this._cookies[key] =  val;
				return this;
			},
			sendFile:function(pathToFile){
				this._sendFile = pathToFile;
				return this;
			},
			set:function(key,val){
				this._headers[key] = val;
				return this;
			},
			get:function(key){
				if (this._headers.hasOwnProperty(key)) return this._headers[key];
				else return null;
			}

		};

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