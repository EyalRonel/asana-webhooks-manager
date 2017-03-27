(function(){

	var eventsController = function($scope){

		this.$scope = $scope;
		this.socket = io({forceNew:true});


		this.socket.connect();

		$scope.$on('$destroy', function(){
			this.socket.disconnect();
		}.bind(this));

		this.socket.on('connect', function (data) {
			console.log('Client connected');
		});

		this.socket.on('disconnect', function (data) {
			console.log('Client disconnected');
		});

		this.socket.on('event',function(data){
			console.log('event',data);
		});

	};

	awmApp.controller('eventsController', ['$scope',eventsController]);

})();