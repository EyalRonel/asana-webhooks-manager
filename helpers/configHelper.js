const asanaConfig = require('../config/asana');

var clientId      = asanaConfig.clientId == null ? process.env['asana_client_id'] : asanaConfig.clientId;
var clientSecret  = asanaConfig.clientSecret == null ? process.env['asana_client_secret'] : asanaConfig.clientSecret;
var redirectUri   = asanaConfig.redirectUri == null ? process.env['asana_redirect_uri'] : asanaConfig.redirectUri;

var config = {
	clientId: clientId,
	clientSecret: clientSecret,
	redirectUri: redirectUri
};

module.exports = {
	getClientId: function(){ return config.clientId; },
	getClientSecret: function(){return config.clientSecret; },
	getRediectUri: function(){return config.redirectUri; }
};

