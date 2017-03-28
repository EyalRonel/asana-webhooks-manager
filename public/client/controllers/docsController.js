(function(){

	var docsController = function($scope,$location,$anchorScroll){

		this.$scope = $scope;
		this.$location = $location;
		this.$anchorScroll = $anchorScroll;
		this.$anchorScroll.yOffset = 10;

		$scope.$on('$destroy', function(){

		}.bind(this));

	};

	docsController.prototype.scrollTo = function(elementId){
		this.$location.hash(elementId);
		this.$anchorScroll();
	};

	awmApp.controller('docsController', ['$scope','$location', '$anchorScroll',docsController]);

})();