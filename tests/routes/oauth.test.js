var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');

//Dependencies
const oauthController = require('../../controllers/oauth');

describe('OAuth route', function () {

	describe('GET /oauth/asana/login', function () {
		var app,
			request,
			route,
			sandbox,
			stub;

		beforeEach(function () {

			sandbox = sinon.sandbox.create();
			stub = sandbox.stub(oauthController.prototype,'loginWithAsana');

			app = express();
			route = proxyquire('../../routes/oauth', {'oauthController':stub})(app);
			request = supertest(app);

		});

		afterEach(function(){

			sandbox.restore();

		});

		it('Should initiate asana login flow', function (done) {

			request
				.get('/oauth/asana/login')
				.expect(200, function (err, res) {
					expect(stub.calledOnce).toBeTruthy();
					done();
				});
		});

	});

	describe('GET /oauth/asana', function () {
		var app,
			request,
			route,
			sandbox,
			stub;

		beforeEach(function () {

			sandbox = sinon.sandbox.create();
			stub = sandbox.stub(oauthController.prototype,'accessTokenFromCode');

			app = express();
			route = proxyquire('../../routes/oauth', {'oauthController':stub})(app);
			request = supertest(app);

		});

		afterEach(function(){

			sandbox.restore();

		});

		it('Should exchage asana auth code to token', function (done) {

			request
				.get('/oauth/asana')
				.query({code:'123455'}) //Simulate passing a code in URL query
				.expect(200, function (err, res) {
					expect(stub.calledOnce).toBeTruthy();
					done();
				});
		});

		it('Should return an error if no code was found in query string', function (done) {

			request
				.get('/oauth/asana')
				.expect(400)
				.end(done);

		});

	});

});

