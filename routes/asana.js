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
 * GET /webhooks/<workspaceId> - Returns a list of all available webhooks for a workspace
 * */
router.get('/webhooks/:workspaceId',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	var token = req.cookies.token;
	var workspaceId = req.params.workspaceId;

	var client = asanaClient(token);

	client.webhooks.getAll(workspaceId)
		.then(function (webhooks) {
			return response(res, 200, webhooks.data);}
		)
		.catch(function (err) { return response(res, 400, {msg:err}, err); });


});

/**
 * POST /webhoooks/<resourceId> - creates a webhook for a specific resource
 * */
router.post('/webhooks/:resourceId',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.resourceId) return response(res, 400, {}, "Missing resourceId");

	var token = req.cookies.token;
	var resourceId = req.params.resourceId;

	var client = asanaClient(token);
	client.webhooks.create(resourceId, "https://" + req.get('host') + "/events/incoming/"+resourceId).then(
		function (response) {
			return res.status(200).json(response);
		})
		.catch(function (err) {
			return res.status(400).json({msg:err});
		});
});

/**
 * DELETE /webhooks/<webhookId> - removes a webhook by it's Id
 * */
router.delete('/webhooks/:webhookId',function(req,res){

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.webhookId) return response(res, 400, {}, "Missing webhookId");

	var token = req.cookies.token;
	var webhookId = req.params.webhookId;

	var client = asanaClient(token);
	client.webhooks.deleteById(webhookId).then(
		function (response) {
			return res.status(200).json(response);
		})
		.catch(function (err) {
			return res.status(400).json({msg:err});
		});

});

/**
 * GET /projects - returns a list of projects for a given workspaceId and their webhookId if available
 * */
router.get('/projects/:workspaceId',function(req,res) {

	if (!req.cookies.token) return response(res, 400, {}, "Missing token");
	if (!req.params.workspaceId) return response(res,400,{},"Missing workspaceId");

	var token = req.cookies.token;
	var workspaceId = req.params.workspaceId;
	var client = asanaClient(token);

	var retval = [];

	client.projects.findByWorkspace(workspaceId)
		.then(function(projects){
			retval = projects.data;
			return client.webhooks.getAll(workspaceId);
		})
		.then(function(webhooks){

			//Create a map of resourceIds->webhookIds
			var resourceWebhooksMap = {};
			for (var i=0;i<webhooks.data.length;i++)
			{
				resourceWebhooksMap[webhooks.data[i].resource.id] = webhooks.data[i];
			}

			//Append to projects response
			for (var i=0;i<retval.length;i++)
			{
				retval[i].webhook = null;
				if (resourceWebhooksMap.hasOwnProperty(retval[i].id)) {
					retval[i].webhook = resourceWebhooksMap[retval[i].id];
				}
			}

			return response(res, 200, retval);
		})
		.catch(function (err) {return response(res, 400, {}, err);});
});

module.exports = router;