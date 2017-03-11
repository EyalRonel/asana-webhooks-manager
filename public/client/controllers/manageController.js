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

		this.workspaces = this.userService.getUser().getWorkspaces();
	};

	manageController.prototype.getProjects = function(workspaceIndex){

		var workspaceId = this.workspaces[workspaceIndex].getId();
		this.asanaService.getProjects(workspaceId).then(
			function(projects){

				var projectsArray = [];
				for (var i=0;i<projects.length;i++){
					projectsArray.push(new AWM.Project(projects[i].id,projects[i].name));
				}

				this.userService.getUser().getWorkspaces()[workspaceIndex].setProjects(projectsArray);

				this.$timeout(function(){
					this.$scope.$apply();
				}.bind(this),0);

			}.bind(this),
			function(error){}.bind(this)
		);
	};


	awmApp.controller('manageController', ['$scope', '$timeout','userService', 'asanaService','navigationService','user',manageController]);

})();