var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var mockResponse = require('../mocks/Response');
var mockRequest = require('../mocks/Request');

var RootController = require('../../controllers/RootController');

describe('Root Controller', function () {

	var RootCtrl;

	beforeEach(function(){});

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