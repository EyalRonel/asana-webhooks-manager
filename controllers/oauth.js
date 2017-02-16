const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');

// router.use(someMiddleware);

//router.get('/', function(req,res){
//  res.status(200).json({ message: 'OAuth get placeholder!' })
//});

router.get('/asana',function(req,res){

  var code = req.query.code;
  if (code) {
    var client = asanaClient();
    client.app.accessTokenFromCode(code).then(function(credentials) {
      console.log('we have credentials',credentials);
      // token is currently saved in a cookie for an hour.
      // Generally, if stored in a cookie it should be secure- and http-only

      res.cookie('token', credentials.access_token, { httpOnly : true, secure: true,  maxAge: 60 * 60 * 1000 });
      // Redirect back home, where we should now have access to Asana data.
      res.redirect('/');
    });
  } else {
    // Authorization could have failed. Show an error.
    res.end('Error getting authorization: ' + req.query.error);
  }

});

module.exports = router;


/**
 * code
 * 0/916215a4bf2b770231a994c376f36dba
 *
 * credentials
 * {
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpemF0aW9uIjoyNzQ3MTI0NDE2NjEyMjMsInNjb3BlIjoiZGVmYXVsdCIsImlhdCI6MTQ4NzI3MDM2MSwiZXhwIjoxNDg3MjczOTYxfQ.3CMKZ6oUqBMGe-1un45byxi6ZYbxjCnX7A9YEFoKrQU',
  token_type: 'bearer',
  expires_in: 3600,
  data:
   {
     id: 1351618790065,
     name: 'Eyal Ronel',
     email: 'roneleyal@gmail.com' },
     refresh_token: '0/6299859fb89b5db4bbf785a8cc5409da'
   }

 * */