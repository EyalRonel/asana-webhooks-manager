awmApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise("");

	$stateProvider
		.state('root', {
			url: '',
			views: {
				'@': {
					templateUrl: '/client/views/main.html',
					controller: 'mainController',
					controllerAs: 'mainCtrl'
				},
				'header@root':{
					templateUrl: '/client/views/header.html',
					controller: 'headerController',
					controllerAs: 'headerCtrl'
				},
				'body@root':{
					templateUrl: '/client/views/body.html'
				},
				'footer@root':{
					templateUrl: '/client/views/footer.html'
				}
			},
			resolve:{
				resolveService: 'resolveService',
				user: function(resolveService){
					return resolveService.resolveUser();
				}
			}
		})
		.state('manage', {
			parent:'root',
			url: '/manage',
			views: {
				'body':{
					templateUrl: '/client/views/manage.html',
					controller: 'manageController',
					controllerAs: 'manageCtrl'
				}
			}
		})
		.state('docs', {
			parent:'root',
			url: '/docs',
			views: {
				'body':{
					templateUrl: '/client/views/docs.html'
				}
			}
		})
}]);