const express = require('express');
const AsanaController = require('../controllers/AsanaController');

var   asanaCtrl = null;

var registerRoutes = function(app,io){

	var router = express.Router();

	router.all('/*',function(req,res,next){

		asanaCtrl = new AsanaController(req,res);

		if (asanaCtrl instanceof AsanaController) {
			next();
		}

	});

	/**
	 * GET /me - returns the currently logged in user
	 * */
	router.get('/me',function(req,res) {
		return asanaCtrl.getUser();
	});

	/**
	 * GET /workspaces - returns a list of workspaces
	 * */
	router.get('/workspaces',function(req,res) {
		return asanaCtrl.getWorkspaces();


	});

	/**
	 * GET /webhooks/<workspaceId> - Returns a list of all available webhooks for a workspace
	 * */
	router.get('/webhooks/:workspaceId',function(req,res) {

		asanaCtrl.getWebhooks(req.params.workspaceId)

	});

	/**
	 * POST /webhoooks/<resourceId> - creates a webhook for a specific resource
	 * */
	router.post('/webhooks/:resourceId',function(req,res) {

		return asanaCtrl.createWebhook(req.params.resourceId);


	});

	/**
	 * DELETE /webhooks/<webhookId>/<resourceId> - removes a webhook by it's Id and resourceId
	 * */
	router.delete('/webhooks/:webhookId/:resourceId',function(req,res){

		return asanaCtrl.removeWebhook(req.params.webhookId.toString(),req.params.resourceId.toString());


	});

	/**
	 * GET /projects - returns a list of projects for a given workspaceId and their webhookIds if available
	 * */
	router.get('/projects/:workspaceId',function(req,res) {

		return asanaCtrl.getProjectsWithWebhooks(req.params.workspaceId);

	});

	app.use('/asana', router);

};



module.exports = registerRoutes;