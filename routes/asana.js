const router      = require('express').Router()
const asanaController = require('../controllers/AsanaController');
var   asanaCtrl = null;

router.all('/*',function(req,res,next){

	asanaCtrl = new asanaController(req,res);

	if (asanaCtrl instanceof asanaController) {
		next();
	}

});

/**
 * GET /me - returns the currently logged in user object
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

	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	asanaCtrl.getWebhooks(req.params.workspaceId)

});

/**
 * POST /webhoooks/<resourceId> - creates a webhook for a specific resource
 * */
router.post('/webhooks/:resourceId',function(req,res) {

	if (!req.params.resourceId) return response(res, 400, {}, "Missing resourceId");

	return asanaCtrl.createWebhook(req.params.resourceId);


});

/**
 * DELETE /webhooks/<webhookId> - removes a webhook by it's Id
 * */
router.delete('/webhooks/:webhookId',function(req,res){

	if (!req.params.webhookId) return response(res, 400, {}, "Missing webhookId");

	return asanaCtrl.removeWebhook(req.params.webhookId);


});

/**
 * GET /projects - returns a list of projects for a given workspaceId and their webhookIds if available
 * */
router.get('/projects/:workspaceId',function(req,res) {

	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	return asanaCtrl.getProjectsWithWebhooks(req.params.workspaceId);

});

module.exports = router;