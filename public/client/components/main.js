awmApp.component('main', {
	templateUrl:  'views/main.html',


	controller: function() {
		this.greeting = 'hello';

		this.toggleGreeting = function() {
			this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
		}
	}
})