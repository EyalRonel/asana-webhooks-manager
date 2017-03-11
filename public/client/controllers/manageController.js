(function(){

	var manageController = function($scope,userService, asanaService,navigationService, user){

		this.$scope = $scope;
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

	manageController.prototype.getProjects = function(workspaceId){
		this.asanaService.getProjects(workspaceId).then(
			function(projects){

				//TODO: handle projects response
				console.log(projects);
			}.bind(this),
			function(error){}.bind(this)
		);
	};


	awmApp.controller('manageController', ['$scope', 'userService', 'asanaService','navigationService','user',manageController]);

})();