var proxyquire = require('proxyquire');
var sinon = require('sinon');
//var sinonStubPromise = require('sinon-stub-promise')(sinon);
var supertest = require('supertest');
var expect = require('expect');
var express = require('express');
var cookieParser = require('cookie-parser')

var AsanaController = require('../../controllers/asanaController');

describe('Asana route', function () {

	var app,
		request,
		route,
		sandbox,
		getUserStub,
		getWorkspacesStub,
		getWebhooksStub,
		createWebhookStub,
		removeWebhookStub,
		getProjectsWithWebhooksStub;

	beforeEach(function () {

		sandbox = sinon.sandbox.create();
		getUserStub = sandbox.stub(AsanaController.prototype,'getUser').callsFake(function(){this.reply(200,{});});
		getWorkspacesStub = sandbox.stub(AsanaController.prototype,'getWorkspaces').callsFake(function(){this.reply(200,{});});
		getWebhooksStub = sandbox.stub(AsanaController.prototype,'getWebhooks').callsFake(function(workspaceId){this.reply(200,{});});
		createWebhookStub = sandbox.stub(AsanaController.prototype,'createWebhook').callsFake(function(resourceId){this.reply(200,{});});
		removeWebhookStub = sandbox.stub(AsanaController.prototype,'removeWebhook').callsFake(function(webhookId){this.reply(200,{});});
		getProjectsWithWebhooksStub = sandbox.stub(AsanaController.prototype,'getProjectsWithWebhooks').callsFake(function(workspaceId){this.reply(200,{});});

		app = express();
		app.use(cookieParser());
		route = proxyquire('../../routes/asana',{'AsanaController':getUserStub})(app);
		request = supertest(app);

	});

	afterEach(function(){
		sandbox.restore();
	});

	it('GET /me - Should fetch the current user object from asana', function(done){

		request
			.get('/asana/me')
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(getUserStub.calledOnce).toBeTruthy("Expecting asanaCtrl.getUser to be called");
				done();
			});

	});

	it('GET /workspaces - Should fetch a list of workspaces for the current user', function(done){

		request
			.get('/asana/workspaces')
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(getWorkspacesStub.calledOnce).toBeTruthy("Expecting asanaCtrl.getWorkspaces to be called");
				done();
			});

	});

	it('GET /webhooks/workspaceId - Should fetch a list of webhooks for the given workspaceId', function(done){

		var workspaceId = "987654321"; //Passed as string, as the request turns an integer to string over http.

		request
			.get('/asana/webhooks/'+workspaceId)
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(getWebhooksStub.calledWith(workspaceId)).toBeTruthy();
				done();
			});

	});

	it('POST /webhoooks/resourceId - Should create a webhook for a specific resource id', function(done){

		var resourceId = "987654321"; //Passed as string, as the request turns an integer to string over http.

		request
			.post('/asana/webhooks/'+resourceId)
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(createWebhookStub.calledWith(resourceId)).toBeTruthy();
				done();
			});

	});

	it('DELETE /webhooks/webhookId - removes a webhook by it\'s Id', function(done){

		var webhookId = "987654321"; //Passed as string, as the request turns an integer to string over http.

		request
			.delete('/asana/webhooks/'+webhookId)
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(removeWebhookStub.calledWith(webhookId)).toBeTruthy();
				done();
			});

	});

	it('GET /projects - returns a list of projects for a given workspaceId and their webhookIds if available', function(done){

		var workspaceId = "987654321"; //Passed as string, as the request turns an integer to string over http.

		request
			.get('/asana/projects/'+workspaceId)
			.set('Cookie','token=1234567')
			.expect('Content-Type', /json/)
			.expect(200, function (err, res) {
				expect(getProjectsWithWebhooksStub.calledWith(workspaceId)).toBeTruthy();
				done();
			});

	});


});

