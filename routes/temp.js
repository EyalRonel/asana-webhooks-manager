var express = require('express');
var moduleA = require('../helpers/moduleA');

module.exports = function (app) {

	var router = express.Router();

	// Mount route as "/users"
	app.use('/temp', router);

	// Add a route that allows us to get a user by their username
	router.get('/x/:param', function (req, res) {

		var ma = new moduleA();

		res.status(200).json({
			txt: ma.x(req.params.param)
		});


	});

};