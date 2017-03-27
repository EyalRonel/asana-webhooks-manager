(function(){

	var eventsController = function($scope){

		this.$scope = $scope;
		this.incomingEvents = [];
		this.socket = io();

		this.socket.connect();

		this.socket.on('connect', function (data) {
			//console.log('Client connected');
		});

		this.socket.on('disconnect', function (data) {
			//console.log('Client disconnected');
		});

		this.socket.on('events',function(data){
			//console.log('event',data);
			//for (var i=data.length-1;i>=0;i--){
			for(var i=0;i<data.length;i++){

				var eventObject = new AWM.Event()
					.setResource(data[i].resource)
					.setUser(data[i].resource)
					.setType(data[i].type)
					.setAction(data[i].action)
					.setCreatedAt(data[i].created_at)
					.setParent(data[i].parent);

				this.incomingEvents.push(eventObject);
			}
			this.$scope.$apply();

		}.bind(this));

		$scope.$on('$destroy', function(){
			this.socket.disconnect();
		}.bind(this));

	};

	awmApp.controller('eventsController', ['$scope',eventsController]);

})();