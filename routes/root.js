const express = require('express');
const path    = require("path");
const asanaClient = require('../helpers/asanaClient');

var registerRoutes = function(app){

	var router = express.Router();

	app.use('/', router);

	router.get('/',function(req,res){
		res.sendFile(path.join(__dirname,'../public/client/views','index.html'));
	});


	router.get('/test',function(req,res,next){

		const rootController = require('../controllers/root');
		var rootCtrl =  new rootController(req,res).test();

	});

};



module.exports = registerRoutes;