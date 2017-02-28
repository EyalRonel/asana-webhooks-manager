awmApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'@': {
					templateUrl: '/client/views/main.html',
					//controllerAs: 'layoutCtrl',
					//controller: 'layoutController'
				}
			}
		})

}]);

