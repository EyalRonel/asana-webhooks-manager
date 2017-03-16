/**
 * AWM.Project
 *
 * A slim representation of an Asana Project, as detailed in: https://asana.com/developers/api-reference/projects
 * */
AWM.Project = function(id,name){


	/**
	 * _id {String} - Asana Project ID
	 * */
	this._id = null;

	/**
	 * _name {String} - Project's name
	 * */
	this._name = null;

	/**
	 * _webhooks {AWM.Webhook} - Project's webhook (if exists)
	 * */
	this._webhook = null;

	/**
	 * Init instance with passed arguments
	 * */
	if (id) this.setId(id);
	if (name) this.setName(name);



};


/**
 * getId - get project id
 *
 * @returns {String}
 * */
AWM.Project.prototype.getId = function(){
	return this._id;
};

/**
 * setId - sets project id
 *
 * @param {String} id
 * @return {AWM.Project}
 * */
AWM.Project.prototype.setId = function(id){
	this._id = id;
	return this;
};

/**
 * getName - get project name
 *
 * @returns {String}
 * */
AWM.Project.prototype.getName = function(){
	return this._name;
};

/**
 * setName - sets project name
 *
 * @param {String} name
 * @return {AWM.Project}
 * */
AWM.Project.prototype.setName = function(name){
	this._name = name;
	return this;
};


/**
 * getWebhooks - get project webhooks
 *
 * @returns {AWM.Webhook}
 * */
AWM.Project.prototype.getWebhook = function(){
	return this._webhook;
};

/**
 * setWebhooks - sets project webooks value
 *
 * @param {AWM.Webhook} webhook object
 * @returns {AWM.Project}
 * */
AWM.Project.prototype.setWebhook = function(webhook){
	this._webhook = webhook;
	return this;
};