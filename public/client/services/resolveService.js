/**
 * resolveService
 * */
(function(){

	var resolveService = function(asanaService,userService,navigationService,$q){

		this.asanaService = asanaService;
		this.userService = userService;
		this.navigationService = navigationService;
		this.$q = $q;

	};

	resolveService.prototype.resolveUser = function(){

		var deferred = this.$q.defer();

		this.asanaService.getUser().then(
			function(payload){
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

				deferred.resolve(this.userService.getUser());

			}.bind(this),
			function(err){
				deferred.resolve(null);
			}.bind(this)
		);

		return deferred.promise;


	};


	awmApp.service("resolveService", ['asanaService','userService','navigationService','$q',resolveService]);

})();