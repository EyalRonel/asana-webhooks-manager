/**
 * AWM.User
 *
 * A full representation of an Asana User data structure as detailed in:
 * https://asana.com/developers/api-reference/users
 * */
AWM.User = function(id,name,email,photo,workspaces){


	/**
	 * _id {String} - A User's Asana ID
	 * */
	this._id = null;

	/**
	 * _name {String} - User's full name
	 * */
	this._name = null;

	/**
	 * _email {String} - User's email address
	 * */
	this._email = null;

	/**
	 * _photo {AWM.UserImage}
	 * */
	this._photo = null;

	/**
	 * _workspaces {[AWM.Workspace]}
	 * */
	this._workspaces = null;


	/**
	 * Init instance with passed arguments
	 * */
	if (id) this.setId(id);
	if (name) this.setName(name);
	if (email) this.setEmail(email);
	if (photo) this.setImage(photo);
	if (workspaces) this.setWorkspaces(workspaces);

};


/**
 * getId - get user's id
 *
 * @returns {String}
 * */
AWM.User.prototype.getId = function(){
	return this._id;
};

/**
 * setId - sets user's id
 *
 * @param {String} id
 * @return {AWM.User}
 * */
AWM.User.prototype.setId = function(id){
	this._id = id;
	return this;
};

/**
 * getName - get user's name
 *
 * @returns {String}
 * */
AWM.User.prototype.getName = function(){
	return this._name;
};

/**
 * setName - sets users name
 *
 * @param {String} name
 * @return {AWM.User}
 * */
AWM.User.prototype.setName = function(name){
	this._name = name;
	return this;
};


/**
 * getEmail - get user's email
 *
 * @returns {String}
 * */
AWM.User.prototype.getEmail = function(){
	return this._email;
};

/**
 * setEmail - sets users email
 *
 * @param {String} email
 * @return {AWM.User}
 * */
AWM.User.prototype.setName = function(email){
	this._email = email;
	return this;
};

/**
 * getPhoto - get user's photo urls
 *
 * @returns {AWM.UserImage}
 * */
AWM.User.prototype.getPhoto = function(){
	return this._photo;
};

/**
 * setPhoto - sets users photo object
 *
 * @param {AWM.UserImage} photoObj
 * @return {AWM.User}
 * */
AWM.User.prototype.setImage = function(photoObj){
	this._photo = photoObj;
	return this;
};

/**
 * getWorkspaces - get user's workspaces
 *
 * @returns {[AWM.Workspace]}
 * */
AWM.User.prototype.getWorkspaces = function(){
	return this._workspaces;
};

/**
 * setWorkspaces - sets users workspaces array
 *
 * @param {[AWM.Workspace]} workspacesArray
 * @return {AWM.User}
 * */
AWM.User.prototype.setImage = function(workspacesArray){
	this._workspaces = workspacesArray;
	return this;
};