/**
 * Require dependencies
 * */
const filesinFolder = require('require-dir')('./');

/**
 * Iterate all files and set their exported router on thr main application router
 * */

var registerRoutes = function(app){
	Object.keys(filesinFolder).forEach(function(routeName) {
		require('./'+routeName)(app);
	});

};



/**
 * Export the complete router with all routes back
 * */
module.exports = registerRoutes;