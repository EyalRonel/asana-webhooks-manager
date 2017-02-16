const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');

// router.use(someMiddleware);

router.get('/asana',function(req,res){

  var code = req.query.code;
  if (code) {
    var client = asanaClient();
    client.app.accessTokenFromCode(code).then(function(credentials) {
      res.cookie('token', credentials.access_token, { httpOnly : true, secure: true,  maxAge: 60 * 60 * 1000 });
      res.redirect('/');
    });
  } else {
    res.end('Error getting authorization: ' + req.query.error);
  }

});

module.exports = router;