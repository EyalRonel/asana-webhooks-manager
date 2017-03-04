(function(){

	var userService = function($cookies,config){

		this.$cookies = $cookies;
		this.config   = config;

		/**
		 * _user {AWM.User}
		 * */
		this._user = null;

	};


	/**
	 * isLoggedIn - a utility method, checks if login cookie exists and returns true/false accordingly
	 *
	 * @returns {Boolean}
	 * */
	userService.prototype.isLoggedIn = function(){
		return this.$cookies.get(this.config.ACCESS_COOKIE) ? true : false;
 	};

	/**
	 * getUser
	 *
	 * @returns {AWM.User}
	 * */
	userService.prototype.getUser = function(){
		return this._user;
	};

	/**
	 * setUser
	 *
	 * @param {AWM.User} userObj
	 * @returns {userService}
	 * */
	userService.prototype.setUser = function(userObj){
		this._user = userObj;
		return this;
	};


	awmApp.service("userService", ['$cookies','config',userService]);

})();