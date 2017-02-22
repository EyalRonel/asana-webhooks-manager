awmApp.config(function($stateProvider) {

	var mainState = {
		name: 'main',
		url: '/',
		component: 'main'
	};

	$stateProvider.state(mainState);
});