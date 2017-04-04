const mongoose = require('mongoose');
//const mongodb = require('../helpers/mongodbHelper');
//var connection = mongodb.getConnection();

var schema = mongoose.Schema({
	resource: String,
	user: String,
	type: String,
	action: String,
	created_at: String,
	parent: String
});

var Event = mongoose.model('Event', schema);

module.exports = Event;