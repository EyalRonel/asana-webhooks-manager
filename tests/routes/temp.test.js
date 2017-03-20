
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');

//Dependencies
var moduleA = require('../../helpers/moduleA');

describe('GET /temp/x/:param', function () {
	var app,
			request,
			route,
			moduleAfnX,
			sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();

		moduleAfnX = sandbox.stub(moduleA.prototype,'x').returns('yyy');
		
		app = express();
		route = proxyquire('../../routes/temp', {'moduleA':moduleAfnX})(app);
		request = supertest(app);

	});

	afterEach(function(){

		sandbox.restore();

	});

	it('should respond with a 200 and a yyy', function (done) {

		request
			.get('/temp/x/test')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(moduleAfnX.calledOnce).toBeTruthy();
				expect(res.body).toEqual({txt:'yyy'});
				done();
			});
	});

});