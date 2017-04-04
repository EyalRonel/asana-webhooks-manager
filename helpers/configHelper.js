const asanaConfig = require('../config/asana');

var config = {};

//Asana App Credentials
config.clientId     = getConfigValue(asanaConfig.clientId,'asana_client_id');
config.clientSecret = getConfigValue(asanaConfig.clientSecret,'asana_client_secret');
config.redirectUri  = getConfigValue(asanaConfig.redirectUri,'asana_redirect_uri');

/**
 * isDefined - Determines is a value is assigned to the pased variable
 *
 * @param {Any}
 * @returns {Boolean}
 * */
function isDefined(param){
	if (param != null && param != "") return true;
	else return false;
}

/**
 * getConfigValue - Returns a config value as defined in an environment variable, or in a config file, if exists
 * @param configFileValue {Any}
 * @param environmentKeyName {String} - a string representing an environment variable name
 *
 * @returns {String} or null
 * */
function getConfigValue(configFileValue,environmentKeyName){
	var retval = configFileValue == null ? process.env[environmentKeyName] : configFileValue;
	return retval;
}

module.exports = {
	//Asana Client
	getClientId: function(){ return config.clientId; },
	getClientSecret: function(){return config.clientSecret; },
	getRediectUri: function(){return config.redirectUri; },
	isReady: function(){
		if (isDefined(config.clientId) && isDefined(config.clientSecret) && isDefined(config.redirectUri)) return true;
		else return false;
	}
};

