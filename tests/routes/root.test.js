var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');

describe('Root route', function () {

	describe('GET /', function () {

		var app,
			request,
			route,
			moduleAfnX,
			sandbox;

		beforeEach(function () {

			app = express();
			route = proxyquire('../../routes/root', {})(app);
			request = supertest(app);

		});

		afterEach(function(){

		});

		it('Should return the AWM angular App', function (done) {

			request
				.get('/')
				.expect(200, function (err, res) {
					expect(res.text.indexOf('ng-app="awmApp"')).toBeGreaterThanOrEqualTo(0);
					done();
				});
		});

	});

});