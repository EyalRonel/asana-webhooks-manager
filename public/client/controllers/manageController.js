(function(){

	var manageController = function($scope, $timeout, userService, asanaService,navigationService, user){

		this.$scope = $scope;
		this.$timeout = $timeout;
		this.userService = userService;
		this.asanaService = asanaService;
		this.navigationService = navigationService;

		this.workspaces = [];

		this.init();

	};

	manageController.prototype.init = function(){
		if (!this.userService.isLoggedIn()){
			this.navigationService.goToState('root');
			return;
		}

		/**
		 * Reference to workspaces on scope
		 * */
		this.workspaces = this.userService.getUser().getWorkspaces();

		/**
		 * References to all projects from all workspaces by id
		 * */
		this.projects = {};
	};

	manageController.prototype.getProjects = function(workspaceIndex){

		var workspaceId = this.userService.getUser().getWorkspaces()[workspaceIndex].getId();
		this.asanaService.getProjects(workspaceId).then(
			function(projects){

				var projectsArray = [];
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

					projectsArray.push(project);

					if (!this.projects.hasOwnProperty(workspaceId)) this.projects[workspaceId] = {};
					this.projects[workspaceId][project.getId()] = project;

				}

				this.userService.getUser().getWorkspaces()[workspaceIndex].setProjects(projectsArray);

				this.$timeout(function(){
					this.$scope.$apply();
				}.bind(this),0);

			}.bind(this),
			function(error){}.bind(this)
		);
	};

	manageController.prototype.getWebhooks = function(workspaceId){

		this.asanaService.getWebhooks(workspaceId).then(
			function(webhooks){

				var webhooksArray = [];

				for (var i=0;i<webhooks.length;i++){

					var resource = new AWM.Project(webhooks[i].resource.id,webhooks[i].resource.name);
					var webhookInstance = new AWM.Webhook().setId(webhooks[i].id).setActive(webhooks[i].active).setTarget(webhooks[i].target).setResource(resource);
					webhooksArray.push(webhookInstance);
				}

			}.bind(this),
			function(error){}.bind(this)
		);
	};





	awmApp.controller('manageController', ['$scope', '$timeout','userService', 'asanaService','navigationService','user',manageController]);

})();