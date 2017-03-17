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
	 * isLoggedIn - a utility method checking if a "login cookie" exists
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


	userService.prototype.logout = function(){
		this.$cookies.remove(this.config.ACCESS_COOKIE);
		return this;
	};


	awmApp.service("userService", ['$cookies','config',userService]);

})();