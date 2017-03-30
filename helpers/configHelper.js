const asanaConfig = require('../config/asana');

var clientId      = asanaConfig.clientId == null ? process.env['asana_client_id'] : asanaConfig.clientId;
var clientSecret  = asanaConfig.clientSecret == null ? process.env['asana_client_secret'] : asanaConfig.clientSecret;
var redirectUri   = asanaConfig.redirectUri == null ? process.env['asana_redirect_uri'] : asanaConfig.redirectUri;

var config = {
	clientId: clientId,
	clientSecret: clientSecret,
	redirectUri: redirectUri
};

var isDefined = function(param){
	if (param != null && param != "") return true;
	else return false;
};

module.exports = {
	getClientId: function(){ return config.clientId; },
	getClientSecret: function(){return config.clientSecret; },
	getRediectUri: function(){return config.redirectUri; },
	isReady: function(){
		if (isDefined(config.clientId) && isDefined(config.clientSecret) && isDefined(config.redirectUri)) return true;
		else return false;
	}
};

