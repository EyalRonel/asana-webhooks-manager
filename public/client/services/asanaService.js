/**
 * asanaService - A thin communication layer to ASANA API, via AWM RESTFul API Endpoints
 *
 * */
(function(){

	var asanaService = function($http,$q,config){

		this.$http    = $http;
		this.$q       = $q;
		this.config   = config;

	};

	/**
	 * getUser - returns the current logged-in user from Asana. response is cached into the _user property
	 *
	 * @param {Boolean} refresh (optional) - if true, refreshes the user object by refecthing form Asana, otherwise returns the cached value
	 * @returns {Promise}
	 * */
	asanaService.prototype.getUser = function(){

		var deferred = this.$q.defer();

		this.$http.get(this.config.ASANA_API_CURRENT_USER, {})
			.then(

				//Success
				function (response) {
					deferred.resolve(response.data.data);
				}.bind(this),

				//Failure
				function (response) {
					deferred.reject(response);
				}.bind(this)

			);

		return deferred.promise;
	};


	asanaService.prototype.getProjects = function(workspaceId){

		if (typeof workspaceId == "undefined") throw new Error("Must provide a workspaceId");

		var deferred = this.$q.defer();

		this.$http.get(this.config.ASANA_API_PROJECTS + '/' + workspaceId, {})
			.then(

				//Success
				function (response) {
					deferred.resolve(response.data.data);
				}.bind(this),

				//Failure
				function (response) {
					deferred.reject(response);
				}.bind(this)

			);

		return deferred.promise;
	};

	asanaService.prototype.getWebhooks = function(workspaceId){

		if (typeof workspaceId == "undefined") throw new Error("Must provide a workspaceId");

		var deferred = this.$q.defer();

		this.$http.get(this.config.ASANA_API_WEBHOOKS+"/"+workspaceId)
			.then(
				//Success
				function (response) {
					deferred.resolve(response.data.data);
				}.bind(this),

				//Failure
				function (response) {
					deferred.reject(response);
				}.bind(this)

			);

		return deferred.promise;
	};

	asanaService.prototype.subscribe = function(resourceId){
		if (typeof resourceId == "undefined") throw new Error("Must provide a resourceId");

		var deferred = this.$q.defer();

		this.$http.post(this.config.ASANA_API_WEBHOOKS + '/' + resourceId, {})
			.then(

				//Success
				function (response) {
					deferred.resolve(response.data);
				}.bind(this),

				//Failure
				function (response) {
					deferred.reject(response);
				}.bind(this)

			);

		return deferred.promise;
	};

	asanaService.prototype.unsubscribe = function(webhookId){
		debugger;
		if (typeof webhookId == "undefined") throw new Error("Must provide a webhookId");

		var deferred = this.$q.defer();

		this.$http.delete(this.config.ASANA_API_WEBHOOKS + '/' + webhookId, {})
			.then(

				//Success
				function (response) {
					deferred.resolve(response.data);
				}.bind(this),

				//Failure
				function (response) {
					deferred.reject(response);
				}.bind(this)

			);

		return deferred.promise;
	};






	awmApp.service("asanaService", ['$http','$q','config',asanaService]);

})();