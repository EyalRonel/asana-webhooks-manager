const express = require('express');
const RootController = require('../controllers/RootController');
var   rootCtrl = null;

var registerRoutes = function(app){

	var router = express.Router();

	router.all('/*',function(req,res,next){

		rootCtrl = new RootController(req,res);

		if (rootCtrl instanceof RootController) {
			next();
		}

	});

	/**
	 * / - Main entry point URL
	 *
	 * @returns Static client files (Angular App)
	 * */
	router.get('/',function(req,res){

		return rootCtrl.getApp();

	});

	app.use('/', router);
};



module.exports = registerRoutes;