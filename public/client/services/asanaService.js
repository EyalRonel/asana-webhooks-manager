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
	asanaService.prototype.getUser = function(refresh){

		var deferred = this.$q.defer();

		if (this._user == null || refresh == true)
		{

			this.$http.get(this.config.ASANA_API_CURRENT_USER, {})
				.then(

					//Success
					function (response) {
						this.setUser(response.data.data);
						deferred.resolve(response.data.data);
					}.bind(this),

					//Failure
					function (response) {
						this.setUser(null);
						deferred.reject(response);
					}.bind(this)

				);
		}

		else {
			deferred.resolve(this._user);
		}

		return deferred.promise;
	};

	awmApp.service("asanaService", ['$http','$q','config',asanaService]);

})();