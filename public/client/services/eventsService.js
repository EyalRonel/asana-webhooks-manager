(function(){


	var eventsService = function($rootScope){

		this.$rootScope = $rootScope;

		/**
		 * socket - reference to socket io instance
		 * initialized when calling the listen method
		 * */
		this.socket = null;

		/**
		 * events {Array<AWM.Event>}
		 * populated by incoming events from the server of the socket
		 * */
		this.events = [];

	};

	/**
	 * listen -  Establishes a websocket connection to the server
	 * @returns {void}
	 * */
	eventsService.prototype.listen = function(){

		if (this.socket == null ) this.socket = io();

		this.socket.connect();

		this.socket.on('events',function(data){

			for(var i=0;i<data.length;i++){

				this.events.push(this.createEvent(data[i]));
			}

			this.$rootScope.$emit('events',data);

		}.bind(this));

	};

	/**
	 * close - the existing websocket connection to the server
	 * @returns {void}
	 * */
	eventsService.prototype.close = function(){

		if (this.socket != null) {

			this.socket.disconnect();
			this.socket = null;

		}

	};

	/**
	 * getEvents - returns an array of events objects
	 * @returns {Array<AWM.Event>}
	 * */
	eventsService.prototype.getEvents = function(){
		return this.events
	};

	/**
	 * clearEvents - clears out the events property
	 * @returns {void}
	 * */
	eventsService.prototype.clear = function(){
		this.events = [];
	};

	/**
	 * createEvent
	 * @param {JSON} eventPayload - an individual event json payload as returned from asana
	 * @returns {AWM.Event}
	 * */
	eventsService.prototype.createEvent = function(eventPayload){
		return new AWM.Event()
			.setResource(eventPayload.resource)
			.setUser(eventPayload.resource)
			.setType(eventPayload.type)
			.setAction(eventPayload.action)
			.setCreatedAt(eventPayload.created_at)
			.setParent(eventPayload.parent);
	};

	awmApp.service("eventsService", ['$rootScope', eventsService]);

})();