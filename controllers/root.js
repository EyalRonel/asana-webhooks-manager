const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');
//router.use(someMiddleware);

router.get('/', function(req,res){

	var client = asanaClient();

	res.render('login.hbs', {'greeting':'Hello',asanaAuthorizeUrl:client.app.asanaAuthorizeUrl()});
});

module.exports = router;