const express = require('express');
const asanaClient = require('../helpers/asanaClient');


var registerRoutes = function(app){

  var router = express.Router();

  /**
   * /oauth/login
   *
   * Redirects the user to Asana's redirect uri
   * */
  router.get('/asana/login',function(req,res){

    const oauthController = require('../controllers/oauth');
    var oauthCtrl =  new oauthController(req,res);
    oauthCtrl.loginWithAsana();

    //Not really needed, used for simplified testing
    oauthCtrl.reply(200,{});

  });


  /**
   * /oauth/asana
   *
   * "Redirect URI endpoint" for Asana to redirect the user back to once authentication is completed
   * */
  router.get('/asana',function(req,res){

    const oauthController = require('../controllers/oauth');
    var oauthCtrl =  new oauthController(req,res);

    var code = req.query.code;
    if (code)
    {
      oauthCtrl.accessTokenFromCode(code);
      oauthCtrl.reply(200,{});
    }
    else
    {
      oauthCtrl.reply(400,{},"Unable to exchange code for access token");
    }

  });

  app.use('/oauth', router);

};




module.exports = registerRoutes;