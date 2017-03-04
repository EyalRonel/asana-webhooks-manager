(function(){
	var mainController = function($scope, navigationService, userService,asanaService){

		this.$scope = $scope;
		this.userService = userService;
		this.asanaService = asanaService;
		this.navigationService = navigationService;

		/**
		 * Check if user is logged in or not
		 * */
		if (this.userService.isLoggedIn()) {

			this.asanaService.getUser().then(function(payload){

				//Handle succesful login by initializing the user model
				if (payload != null)
				{

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


					//Redirect to webhooks managerment screen
					this.navigationService.goToState('manage');

					debugger;

				}

				//Go back to main screen
				else
				{
					this.navigationService.goToState('root');
				}
			}.bind(this),
			function(){

				this.navigationService.goToState('root');

			}.bind(this)
			);
		};


	};


	awmApp.controller('mainController', ['$scope', 'navigationService', 'userService', 'asanaService', mainController]);

})();