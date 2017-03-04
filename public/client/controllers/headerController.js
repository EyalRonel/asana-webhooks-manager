(function(){

	var headerController = function($scope,navigationService,userService){

		this.$scope = $scope;
		this.navigationService = navigationService;
		this.userService = userService;

	};

	awmApp.controller('headerController', ['$scope', 'navigationService', 'userService',headerController]);

})();