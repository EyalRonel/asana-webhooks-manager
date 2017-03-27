AWM.Event = function(){

	/**
	 * resource {Integer} - resource ID (project/task)
	 * */
	this._resource = null;

	/**
	 * user {Integer} - user ID to trigger the event
	 * */
	this._user = null;

	/**
	 * type {String} (story/task/...)
	 * */
	this._type = null;

	/**
	 * action {String} - (changed/removed/added/...)
	 * */
	this._action = null;

	/**
	 * created_at {String} - (ISO Date String)
	 * */
	this._created_at = null;

	/**
	 * parent {Integer}
	 * */
	this._parent = null;


};

/**
 * getResource
 *
 * @returns {Integer}
 * */
AWM.Event.prototype.getResource = function(){
	return this._resource;
};

/**
 * setResource
 *
 * @param {Integer} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setResource = function(value){
	this._resource = value;
	return this;
};

/**
 * getUser
 *
 * @returns {Integer}
 * */
AWM.Event.prototype.getUser = function(){
	return this._user;
};

/**
 * setUser
 *
 * @param {Integer} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setUser = function(value){
	this._user = value;
	return this;
};

/**
 * getType
 *
 * @returns {Integer}
 * */
AWM.Event.prototype.getType = function(){
	return this._type;
};

/**
 * setType
 *
 * @param {Integer} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setType = function(value){
	this._type = value;
	return this;
};

/**
 * getAction
 *
 * @returns {String}
 * */
AWM.Event.prototype.getAction = function(){
	return this._action;
};

/**
 * setAction
 *
 * @param {String} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setAction = function(value){
	this._action = value;
	return this;
};

/**
 * getCreatedAt
 *
 * @returns {String}
 * */
AWM.Event.prototype.getCreatedAt = function(){
	return this._created_at;
};

/**
 * setCreatedAt
 *
 * @param {String} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setCreatedAt = function(value){
	this._created_at = value;
	return this;
};


/**
 * getParent
 *
 * @returns {Integer}
 * */
AWM.Event.prototype.getParent = function(){
	return this._parent;
};

/**
 * setParent
 *
 * @param {Integer} value
 * @return {AWM.Event}
 * */
AWM.Event.prototype.setParent = function(value){
	this._parent = value;
	return this;
};
