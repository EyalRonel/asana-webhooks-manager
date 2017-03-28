(function(){
	var mainController = function($rootScope, $scope, navigationService, userService,asanaService){

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.userService = userService;
		this.asanaService = asanaService;
		this.navigationService = navigationService;
		
	};


	awmApp.controller('mainController', ['$rootScope', '$scope', 'navigationService', 'userService', 'asanaService', mainController]);

})();