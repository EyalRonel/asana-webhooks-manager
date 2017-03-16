AWM.Webhook = function(){

	/**
	 * id {String} - A Unique webhook ID
	 * */
	this._id = null;

	/**
	 * active {Boolean} - The webhook status
	 * */
	this._active = null;

	/**
	 * resource {AWM.Project}
	 * */
	this._resource = null;

	/**
	 * target {String} - Webhook Target URL
	 * */
	this._target = null;

};

/**
 * getId - get webhook id
 *
 * @returns {String}
 * */
AWM.Webhook.prototype.getId = function(){
	return this._id;
};

/**
 * setId - sets webhook id
 *
 * @param {String} id
 * @return {AWM.Project}
 * */
AWM.Webhook.prototype.setId = function(id){
	this._id = id;
	return this;
};

/**
 * getActice - get webhook status
 *
 * @returns {Boolean}
 * */
AWM.Webhook.prototype.getActive = function(){
	return this._active;
};

/**
 * setId - sets webhook status
 *
 * @param {Boolean} value
 * @returns {AWM.Webhook}
 * */
AWM.Webhook.prototype.setActive = function(value){
	this._active = value;
	return this;
};

/**
 * isActive - a convenience/alias method for getActive()
 *
 * @returns {Boolean}
 * */
AWM.Webhook.prototype.isActive = function(){
	return this.getActive();
};


/**
 * getResource - returns the resource object associated with the webhook
 *
 * @returns {AWM.Project}
 * */
AWM.Webhook.prototype.getResource = function(){
	return this._resource;
};

/**
 * setResource
 *
 * @param {AWM.Project}
 * @returns {AWM.Webhook}
 * */
AWM.Webhook.prototype.setResource = function(resource){
	this._resource = resource;
	return this;
};


/**
 * getTarget
 *
 * @returns {String} targetUrl
 * */
AWM.Webhook.prototype.getTarget = function(){
	return this._target;
};

/**
 * setTarget
 *
 * @param {String} targetUrl
 * @returns {AWM.Webhook}
 * */
AWM.Webhook.prototype.setTarget = function(targetUrl){
	this._target = targetUrl;
	return this;
};

