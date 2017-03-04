/**
 * AWM.Workspace
 *
 * A modified/slim representation of an Asana Workspace data structure.
 *
 * The current implementation overlooks the "is_organization" flag (as detailed in https://asana.com/developers/api-reference/workspaces)
 * and adds a "projects" attribute with references to workspace projects for simplified use: myWorkspace.getProjects()
 * */
AWM.Workspace = function(id,name,projects){


	/**
	 * _id {String} - A User's Asana ID
	 * */
	this._id = null;

	/**
	 * _name {String} - User's full name
	 * */
	this._name = null;

	/**
	 * _projects {[AWM.Project]} - an array of projects
	 * */
	this._projects = [];

	/**
	 * Init instance with passed arguments
	 * */
	if (id) this.setId(id);
	if (name) this.setName(name);
	if (projects) this.setProjects(projects);

};


/**
 * getId - get workspace id
 *
 * @returns {String}
 * */
AWM.Workspace.prototype.getId = function(){
	return this._id;
};

/**
 * setId - sets workspace id
 *
 * @param {String} id
 * @return {AWM.Workspace}
 * */
AWM.Workspace.prototype.setId = function(id){
	this._id = id;
	return this;
};

/**
 * getName - get workspace name
 *
 * @returns {String}
 * */
AWM.Workspace.prototype.getName = function(){
	return this._name;
};

/**
 * setName - sets workspace name
 *
 * @param {String} name
 * @return {AWM.Workspace}
 * */
AWM.Workspace.prototype.setName = function(name){
	this._name = name;
	return this;
};

/**
 * getProjects - get all projects in workspace
 *
 * @returns {[AWM.Project]}
 * */
AWM.Workspace.prototype.getProjects = function(){
	return this._projects;
};

/**
 * setProjects - sets the value of the projects property name
 *
 * @param {[AWM.Project]} projectsArray
 * @return {AWM.Workspace}
 * */
AWM.Workspace.prototype.setProjects = function(projectsArray){
	this._projects = projectsArray;
	return this;
};