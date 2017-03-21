const express = require('express');
const asanaClient = require('../helpers/asanaClient');
const oauthController = require('../controllers/oauth');

var registerRoutes = function(app){

  var router = express.Router();

  /**
   * /oauth/login
   *
   * Redirects the user to Asana's redirect uri
   * */
  router.get('/asana/login',function(req,res){

    var oauthCtrl =  new oauthController(req,res);
    oauthCtrl.loginWithAsana();

  });


  /**
   * /oauth/asana
   *
   * "Redirect URI endpoint" for Asana to redirect the user back to once authentication is completed
   * */
  router.get('/asana',function(req,res){

    var oauthCtrl =  new oauthController(req,res);

    var code = req.query.code;
    if (code)
    {
      return oauthCtrl.accessTokenFromCode(code);
    }
    else
    {
      oauthCtrl.reply(400,{},"Unable to exchange code for access token");
    }

  });

  app.use('/oauth', router);

};




module.exports = registerRoutes;