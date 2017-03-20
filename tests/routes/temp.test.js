
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');

//Dependencies
var moduleA = require('../../helpers/moduleA');

describe('GET /temp/x/:param', function () {
	var app, request, route, xStub;

	beforeEach(function () {

		xStub = sinon.stub(moduleA.prototype,'x');
		app = express();
		route = proxyquire('../../routes/temp', {'moduleA':xStub})(app);
		request = supertest(app);
		
	});

	it('should respond with a 200 and a yyy', function (done) {

		xStub.returns('yyy');

		request
			.get('/temp/x/test')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(xStub.calledOnce);
				expect(res.body).toEqual({txt:'yyy'});
				done();
			});
	});

});