const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');

/**
 * /oauth/login
 *
 * Redirects the user to Asana's redirect uri
 * */
router.get('/asana/login',function(req,res){

  const oauthController = require('../controllers/oauth');
  var oauthCtrl =  new oauthController(req,res).login();
  
});


/**
 * /oauth/asana
 *
 * "Redirect URI endpoint" for Asana to redirect the user back to once authentication is completed
 * */
router.get('/asana',function(req,res){

  var code = req.query.code;
  if (code) {
    var client = asanaClient();
    client.app.accessTokenFromCode(code).then(function(credentials) {

      //Set a secure HTTP Only cookie to hold the token
      res.cookie('token', credentials.access_token, { httpOnly : true, secure: true,  maxAge: 60 * 60 * 1000 });

      //Set a utility cookie that expires along with the token, yet accessible to the client via javascript
      res.cookie('awm_login', true, {maxAge: 60 * 60 * 1000 });

      //Rediect to app
      res.redirect('/');
    });
  } else {
    res.end('Error getting authorization: ' + req.query.error);
  }

});



module.exports = router;