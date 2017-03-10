/**
 * resolveService
 * */
(function(){

	var resolveService = function(asanaService,userService,navigationService){

		this.asanaService = asanaService;
		this.userService = userService;
		this.navigationService = navigationService;

	};

	resolveService.prototype.init = function(){
		return this.asanaService.getUser().then(
			function(payload){this.resolve(payload)}.bind(this),
			function(){this.reject}.bind(this)
		);
	};

	resolveService.prototype.resolve = function(payload){

		//Handle successful login by initializing the user model
		if (payload == null){
			this.navigationService.goToState('root');
			return false;
		}

		//Init workspace models
		var workspaces = [];
		for (var i=0;i<payload.workspaces.length;i++) {
			var workspace = new AWM.Workspace(payload.workspaces[i].id, payload.workspaces[i].name);
			workspaces.push(workspace);
		}

		//Init photo model
		var photo = new AWM.Photo().initFromPayload(payload.photo);

		//Finally, create a user instance
		var AWMUser = new AWM.User(payload.id,payload.name,payload.email,photo,workspaces);
		this.userService.setUser(AWMUser);

		return true;

		console.log('re-serv resolve');
	};

	resolveService.prototype.reject = function(){
		//Do nothing
		return false;
		console.log('re-serv reject');
	};

	awmApp.service("resolveService", ['asanaService','userService','navigationService',resolveService]);

})();