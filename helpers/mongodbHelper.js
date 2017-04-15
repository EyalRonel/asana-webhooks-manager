const mongoose = require('mongoose');
const mongodbConfig = require('../config/mongodb');

var connection = null;
var config = {};

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

/**
 * getMongoDBConnectionString - retruns a mongoDB connection string
 *
 * @returns {String} - format: mongodb://[user[:pass@]host[:port]/[database]
 * */
function getMongoDBConnectionString(){
	var conStr = "mongodb://";
	if (config.mongodbUsername != null && config.mongodbPassword != null) conStr += config.mongodbUsername + ":" + config.mongodbPassword + "@";

	if (config.mongodbHost != null) conStr += config.mongodbHost;
	else conStr += "127.0.0.1";

	if (config.mongodbPort != null) conStr += ":" + config.mongodbPort;
	else conStr += ":27017";

	if (config.mongodbDatabase) conStr += "/" + config.mongodbDatabase;
	else throw new Error("Missing mongodb database configuration");
	return conStr;
}

//MongoDB Connection Details
config.mongodbUsername  = getConfigValue(mongodbConfig.username,'mongodb_username');
config.mongodbPassword  = getConfigValue(mongodbConfig.password,'mongodb_password');
config.mongodbHost      = getConfigValue(mongodbConfig.host,'mongodb_host');
config.mongodbPort      = getConfigValue(mongodbConfig.port,'mongodb_port');
config.mongodbDatabase  = getConfigValue(mongodbConfig.database,'mongodb_database');

module.exports = {
	getMongoDBConnectionString: getMongoDBConnectionString,
	getConnection:function(){
		if (connection == null) connection = mongoose.connect(getMongoDBConnectionString());
		return connection;
	}
};