awmApp.directive('codeHighlight', function () {

	return {
		restrict: 'AE',
		link: function ($scope, element) {
			hljs.highlightBlock(element[0]);
		}
	};

});