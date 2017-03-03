(function(){

	var navigationService = function($state){

		this.$state = $state;

		this.pages = [
			{
				title: "Home",
				state: "root",
				active: true
			},
			{
				title: "Manage",
				state: "manage",
				active: false
			},
			{
				title: "Docs",
				state: "docs",
				active: false
			}
		];

	};



	navigationService.prototype.goToState = function(stateName){

		for (var i=0;i<this.pages.length;i++){

			this.pages[i].active = false;
			if (this.pages[i].state == stateName) this.pages[i].active = true;

		}

		this.$state.go(stateName);
	};

	awmApp.service("navigationService", ['$state', navigationService]);


})();