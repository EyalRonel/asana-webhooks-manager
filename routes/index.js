/**
 * Require dependencies
 * */
const filesinFolder = require('require-dir')('./');

/**
 * Iterate all files and set their exported router on the main application router
 * */

var registerRoutes = function(app,io){
	Object.keys(filesinFolder).forEach(function(routeName) {
		require('./'+routeName)(app,io);
	});

};

/**
 * Export the complete router with all routes back
 * */
module.exports = registerRoutes;