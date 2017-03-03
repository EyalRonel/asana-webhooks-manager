(function(){

	var headerController = function($scope,navigationService){

		this.$scope = $scope;
		this.navigationService = navigationService;

	};

	awmApp.controller('headerController', ['$scope', 'navigationService',headerController]);

})();