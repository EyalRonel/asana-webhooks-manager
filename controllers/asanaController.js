const AWMController = require('./AWMController');
const asana = require('../helpers/asanaClient');

class AsanaController extends AWMController {

	constructor(req, res) {

		//Init parent
		super(req, res);

		//Verify user access
		if (!req.cookies.token) return this.reply(400, {}, "Unauthorized request, please login with Asana");

		//Init Asana client
		this.client = asana(req.cookies.token);

	}

	getUser(){
		return this.client.users.me()
			.then(function (me) { return this.reply(200, me);}.bind(this))
			.catch(function (err) { return this.reply(400, {}, err);}.bind(this));
	}

	getWorkspaces(){
		return this.client.workspaces.findAll()
			.then(function (workspaces) { return this.reply(200,workspaces.data); }.bind(this))
			.catch(function (err) { return this.reply(400,{},err); }.bind(this));
	}

	getProjects(workspaceId){
		return this.client.projects.findByWorkspace(workspaceId)
			.then(function(projects){ return this.reply(200,projects.data) }.bind(this))
			.catch(function (err) { return this.reply(400, {}, err);}.bind(this));
	}

	getProjectsWithWebhooks(workspaceId){

		var retval = [];

		return this.client.projects.findByWorkspace(workspaceId)
			.then(function(projects){
				retval = projects.data;
				return this.client.webhooks.getAll(workspaceId);
			}.bind(this))
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

				return this.reply(200, retval);
			}.bind(this))
			.catch(function (err) { return this.reply(400, {}, err);}.bind(this));
	}

	getWebhooks(workspaceId){
		return this.client.webhooks.getAll(workspaceId)
			.then(function (webhooks) { return this.reply(200, webhooks.data);}.bind(this))
			.catch(function (err) { return this.reply(400, {}, err);}.bind(this));
	}

	createWebhook(resourceId){
		return this.client.webhooks.create(resourceId, "https://" + this.request().get('host') + "/events/incoming/"+resourceId)
			.then(function (response) { return this.reply(200,response); }.bind(this))
			.catch(function (err) { return this.reply(400,{},err); }.bind(this));
	}

	removeWebhook(webhookId){
		return this.client.webhooks.deleteById(webhookId)
			.then(function (response) {return this.reply(200,response,"Webhook removed!");}.bind(this))
			.catch(function (err) { return this.reply(400,{},err) }.bind(this));
	}

}

module.exports = AsanaController;