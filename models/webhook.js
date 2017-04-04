const mongoose = require('mongoose');

var schema = mongoose.Schema({
	resource_id: String,
	secret: String
});

var Webhook = mongoose.model('Webhook', schema);

module.exports = Webhook;