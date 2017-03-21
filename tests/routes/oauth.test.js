var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');

const oauthController = require('../../controllers/oauth');

describe('OAuth route', function () {

		var app,
			request,
			route,
			sandbox,
			accessTokenFromCodeStub;

		beforeEach(function () {

			sandbox = sinon.sandbox.create();
			accessTokenFromCodeStub = sandbox.stub(oauthController.prototype,'accessTokenFromCode');

			app = express();
			route = proxyquire('../../routes/oauth', {'oauthController':accessTokenFromCodeStub})(app);
			request = supertest(app);

		});

		afterEach(function(){
			sandbox.restore();
		});

		it('Should redirect to asana login page', function (done) {

			request
				.get('/oauth/asana/login')
				.expect(0,function(err,res){
					expect(res.statusCode).toBeGreaterThanOrEqualTo(301,'Expecting redirect code of 301');
					expect(res.statusCode).toBeLessThanOrEqualTo(302,'Expecting redirect code of 302');
					done();
			});

		});

		it('Should return 400 if code is missing in URL query', function (done) {

			request
				.get('/oauth/asana')
				.expect(0,function(err,res){
					expect(res.statusCode).toBe(400);
					done();
				});

		});

		//it('Should call convert code to token when code is present', function (done) {
		//
		//	request
		//		.get('/oauth/asana')
		//		.query({code: '123445'})
		//		.expect(0, function (err, res) {
		//			//expect(res.statusCode).toBeGreaterThanOrEqualTo(301, 'Expecting rediect code of 301');
		//			//expect(res.statusCode).toBeLessThanOrEqualTo(302, 'Expecting rediect code of 302');
		//			done();
		//		});
		//});


});