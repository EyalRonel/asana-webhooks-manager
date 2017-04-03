(function(){

	var docsController = function($scope,$location,$anchorScroll){

		this.$scope = $scope;
		this.$location = $location;
		this.$anchorScroll = $anchorScroll;
		this.$anchorScroll.yOffset = 10;

		this.temp = 25;

		$scope.$on('$destroy', function(){

		}.bind(this));

	};

	docsController.prototype.scrollTo = function(elementId){
		this.$location.hash(elementId);
		this.$anchorScroll();
	};

	docsController.prototype.tempIsLargerThan = function(int){
		if (this.temp > int) return true;
		else return false;
	}

	awmApp.controller('docsController', ['$scope','$location', '$anchorScroll',docsController]);

})();