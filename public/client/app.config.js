(function(){

	var config = {}

	config.ACCESS_COOKIE = "awm_login";

	config.BASE_API_URL = "";
	config.BASE_ASANA_API_URL = config.BASE_API_URL + "/asana";
	config.ASANA_API_CURRENT_USER = config.BASE_ASANA_API_URL + "/me";
	config.ASANA_API_WORKSPACES = config.BASE_ASANA_API_URL + "/workspaces";

	awmApp.constant('config',config);

})();
