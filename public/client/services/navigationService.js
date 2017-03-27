(function(){

	var navigationService = function($state){

		this.$state = $state;

		this.pages = [
			{
				title: "Home",
				state: "root",
				active: true,
				auth: false
			},
			{
				title: "Manage",
				state: "manage",
				active: false,
				auth: true
			},
			{
				title: "Live view",
				state: "events",
				active: false,
				auth: false
			},
			{
				title: "Docs",
				state: "docs",
				active: false,
				auth: false
			}
		];

	};


	navigationService.prototype.goToState = function(stateName,params,options){

		if (typeof params == "undefined") params  = {};
		if (typeof options == "undefined") options  = {};

		if (this.$state.current.name == stateName) return;

		for (var i=0;i<this.pages.length;i++){

			this.pages[i].active = false;
			if (this.pages[i].state == stateName) this.pages[i].active = true;

		}

		this.$state.go(stateName,params,options);
	};

	awmApp.service("navigationService", ['$state', navigationService]);


})();