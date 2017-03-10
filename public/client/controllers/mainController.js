(function(){
	var mainController = function($rootScope, $scope, navigationService, userService,asanaService){

		console.log('main');

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.userService = userService;
		this.asanaService = asanaService;
		this.navigationService = navigationService;

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				console.log('from',fromState.name,'to',toState.name);

			}.bind(this));

	};


	awmApp.controller('mainController', ['$rootScope', '$scope', 'navigationService', 'userService', 'asanaService', mainController]);

})();