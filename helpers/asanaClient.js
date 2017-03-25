const asanaConfig = require('../helpers/configHelper');
const asana = require('asana');

var client = function(token){

	var client = asana.Client.create({
		clientId:     asanaConfig.getClientId(),
		clientSecret: asanaConfig.getClientSecret(),
		redirectUri:  asanaConfig.getRediectUri()
	});

	if (token) client.useOauth({credentials: token});

	return client;
};

module.exports = client;
