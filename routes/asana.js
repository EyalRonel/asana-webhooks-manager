const router      = require('express').Router()
const asanaClient = require('../helpers/asanaClient');
const response    = require('../helpers/response');
const restrictedAcess  = require('../middlewares/restrictedAccess');

router.use(restrictedAcess);

/**
 * GET /me - returns the currently logged in user object
 * */
router.get('/me',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");

	var token = req.cookies.token;

	var client = asanaClient(token);

	client.users.me()
		.then(function (me) { return response(res, 200, me,"");})
		.catch(function (err) { return response(res, 400, {}, err); });
});

/**
 * GET /workspaces - returns a list of workspaces
 * */
router.get('/workspaces',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");

	var token = req.cookies.token;

	var client = asanaClient(token);

	client.workspaces.findAll()
		.then(function (workspaces) {
			return res.json(workspaces.data);
			//return response(res, 200, workspaces.data,"");
		})
		.catch(function (err) {
			//return response(res, 400, {}, err);
			return res.json({"err":err});
		});
});

/**
 * GET /projects - returns a list of projects for a provided workspace
 * */
router.get('/projects/:workspaceId',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	var token = req.cookies.token;

	var client = asanaClient(token);

	client.projects.findByWorkspace(req.params.workspaceId)
		.then(function (projects) {
			return response(res, 200, projects.data,"");
		})
		.catch(function (err) {
			return response(res, 400, {}, err);

		});
});


/**
 * GET /webhooks/<workspaceId> - Returns a list of all available webhooks for a workspace
 * */
router.get('/webhooks/:workspaceId',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	var token = req.cookies.token;
	var workspaceId = req.params.workspaceId;

	var client = asanaClient(token);

	client.webhooks.getAll(workspaceId)
		.then(function (response) { return response(res, 200, response);})
		.catch(function (err) { return response(res, 400, response, err); });
});


module.exports = router;