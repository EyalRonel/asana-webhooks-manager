(function(){

	var manageController = function($scope, $timeout, userService, asanaService, navigationService){

		this.$scope = $scope;
		this.$timeout = $timeout;
		this.userService = userService;
		this.asanaService = asanaService;
		this.navigationService = navigationService;

		this.workspaces = [];

		this.init();

	};

	/**
	 * init - verify user access
	 * */
	manageController.prototype.init = function(){
		if (!this.userService.isLoggedIn()){
			this.navigationService.goToState('root');
			return;
		}

		/**
		 * workspaces - Workspaces array referenced from the user service
		 * */
		this.workspaces = this.userService.getUser().getWorkspaces();

		/**
		 * projects - A tree like structure to hold references to all projects by workspace id
		 *
		 * {
		 *  <workspace id>:{
		 *    <project id>: {AWN.Project},
		 *    ...
		 *  },
		 *  ...
		 * }
		 *
		 * */
		this.projects = {};
	};

	/**
	 * getProjects - returns a list of projects for the provided workspace
	 * */
	manageController.prototype.getProjects = function(workspaceIndex){

		var workspaceId = this.userService.getUser().getWorkspaces()[workspaceIndex].getId();

		this.asanaService.getProjects(workspaceId).then(
			function(projects){
				var AWMProjectsArray = [];
				for (var i=0;i<projects.length;i++){

					var project = new AWM.Project(projects[i].id,projects[i].name);

					if (projects[i].webhook != null) {
						var webhook = new AWM.Webhook()
							.setId(projects[i].webhook.id)
							.setActive(projects[i].webhook.active)
							.setResource(projects[i].webhook.resource)
							.setTarget(projects[i].webhook.target);
						project.setWebhook(webhook);
					}

					AWMProjectsArray.push(project);

					if (!this.projects.hasOwnProperty(workspaceId)) this.projects[workspaceId] = {};
					this.projects[workspaceId][project.getId()] = project;

				}

				this.userService.getUser().getWorkspaces()[workspaceIndex].setProjects(AWMProjectsArray);

				this.$timeout(function(){
					this.$scope.$apply();
				}.bind(this),0);

			}.bind(this),
			function(error){}.bind(this)
		);
	};

	/**
	 * Subscribe - registers a webhook for a project and updates client data model
	 * */
	manageController.prototype.subscribe = function(workspaceId,projectId){
		this.asanaService.subscribe(projectId)
			.then(function(webhook){
				var webhookObject = new AWM.Webhook()
					.setId(webhook.id)
					.setActive(webhook.active)
					.setResource(webhook.resource)
					.setTarget(webhook.target);
				this.projects[workspaceId][projectId].setWebhook(webhookObject);
			}.bind(this))
			.catch(function(err){
				//Handle error
			}.bind(this));
	};

	/**
	 * Unsubscribe - removes an existing webhook and updates client data model
	 * */
	manageController.prototype.unsubscribe = function(workspaceId,projectId,webhookId){
		this.asanaService.unsubscribe(webhookId)
			.then(function(response){
				this.projects[workspaceId][projectId].setWebhook(null);
			}.bind(this))
			.catch(function(err){
				//Handle Error
			}.bind(this));
	};






	awmApp.controller('manageController', ['$scope', '$timeout','userService', 'asanaService','navigationService',manageController]);

})();