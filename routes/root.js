const express = require('express');
const path    = require("path");

var registerRoutes = function(app){

	var router = express.Router();

	app.use('/', router);

	router.get('/',function(req,res){
		res.sendFile(path.join(__dirname,'../public/client/views','index.html'));
	});

};



module.exports = registerRoutes;