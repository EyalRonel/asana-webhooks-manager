const config = require('../config/asana');
const asana = require('asana');

var clientId      = config.clientId == null ? process.env['asana_client_id'] : config.clientId;
var clientSecret  = config.clientSecret == null ? process.env['asana_client_secret'] : config.clientSecret;
var redirectUri   = config.redirectUri == null ? process.env['asana_redirect_uri'] : config.redirectUri;

var client = function(token){

	var client = asana.Client.create({
		clientId:     clientId,
		clientSecret: clientSecret,
		redirectUri:  redirectUri
	});

	if (token) client.useOauth({credentials: token});

	return client;
};

module.exports = client;
