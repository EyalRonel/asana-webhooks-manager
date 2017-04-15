const mongoose = require('mongoose');

var schema = mongoose.Schema({
	webhook_id: String,
	resource_id: String,
	secret: String
});

var Webhook = mongoose.model('Webhook', schema);

module.exports = Webhook;