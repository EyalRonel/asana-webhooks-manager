var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var RootController = require('../../controllers/RootController');

describe('Root Controller', function () {

	var RootCtrl,
		mockRequest,
		mockResponse;

	beforeEach(function(){

		mockRequest = sinon.stub().returns(
			{
				header:'fakeHeader'
			}
		);

		mockResponse = {

			_status:null,
			_json:null,
			_redirectUrl:null,
			_cookies:{},
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
			}

		};

	});

	afterEach(function(){

	});

	it('Should return the AWM client-side application main entry file (index.html)',function(done){

		var appPath = "/public/client/views/index.html";

		RootCtrl = new RootController(mockRequest,mockResponse);
		RootCtrl.getApp();
		expect(RootCtrl.response()._sendFile.indexOf(appPath)).toBeGreaterThanOrEqualTo(0);
		done();
	});

});