const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');

/**
 * /oauth/login
 *
 * Redirects the user to Asana's redirect uri
 * */
router.get('/asana/login',function(req,res){

  const oauthController = require('../controllers/oauth');
  var oauthCtrl =  new oauthController(req,res).loginWithAsana();

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
  }
  else
  {
    oauthCtrl.reply(400,{},"Unable to exchange code for access token");
  }

});


module.exports = router;