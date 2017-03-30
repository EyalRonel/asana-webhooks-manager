(function(){

	var headerController = function($scope,navigationService,userService,asanaService){

		this.$scope = $scope;
		this.navigationService = navigationService;
		this.userService = userService;
		this.asanaService = asanaService;

	};

	awmApp.controller('headerController', ['$scope', 'navigationService', 'userService', 'asanaService',headerController]);

})();