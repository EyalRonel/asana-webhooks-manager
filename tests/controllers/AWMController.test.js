var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var AWMController = require('../../controllers/AWMController');

describe('AWM Controller', function () {

	var AWMCtrl,
		mockRequest,
		mockResponse;

	before(function(){

		mockRequest = sinon.stub().returns(
			{
				header:'fakeHeader'
			}
		);

		mockResponse = {
				_status:null,
				_json:null,
				status:function(code){
					this._status = code;
					return this;
				},
				json:function(hash){
					this._json = hash;
					return this;
				}
			};


		AWMCtrl = new AWMController(mockRequest,mockResponse);
	});

	after(function(){});

	it('Should expose the passed request and response objects via public methods)',function(done){
		expect(AWMCtrl.request()).toBe(mockRequest);
		expect(AWMCtrl.response()).toBe(mockResponse);
		done();
	});

	it('should provide a reply method to easily return structured json responses',function(done){

		var responseCode = 200;
		var responseData = {key:"value"};
		var responseMsg = "Test string";

		AWMCtrl.reply(responseCode,responseData,responseMsg);

		expect(mockResponse._status).toEqual(200);
		expect(mockResponse._json).toEqual({code: responseCode, data: responseData, msg: responseMsg});

		done();
	});

	it('should return a default message per status code, if it was not provided when calling reply - test for code 200',function(done){

		var responseCode = 200;
		var responseData = {key:"value"};

		var expecetedResponseMsg = "OK";

		AWMCtrl.reply(responseCode,responseData);

		expect(mockResponse._status).toEqual(200);
		expect(mockResponse._json).toEqual({code: responseCode, data: responseData, msg: expecetedResponseMsg});

		done();
	});

});