(function(){

	var eventsController = function($rootScope, $scope, eventsService){

		this.$rootScope = $rootScope;
		this.$scope = $scope;

		this.events = [];
		this.eventsListener = null;

		this.eventsService = eventsService;
		this.eventsService.listen();

		this.eventsListener = this.$rootScope.$on('events', function (event, data) {
			this.events = this.eventsService.getEvents();
			this.$scope.$apply();
		}.bind(this));

		$scope.$on('$destroy', function(){

			//Stop listening to notifications from eventService
			this.eventsListener();

			//Close websocket connection
			this.eventsService.close();

		}.bind(this));

	};

	awmApp.controller('eventsController', ['$rootScope', '$scope', 'eventsService' ,eventsController]);

})();