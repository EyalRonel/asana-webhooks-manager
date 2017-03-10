(function(){

	var manageController = function($scope,userService, asanaService,navigationService){

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

	awmApp.controller('manageController', ['$scope', 'userService', 'asanaService','navigationService',manageController]);

})();