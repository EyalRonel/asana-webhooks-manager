const router = require('express').Router();
const asanaClient = require('../helpers/asanaClient');
router.get('/', function(req,res){

	var client = asanaClient();

	var viewData = {
		greeting:'Hello',
		asanaAuthorizeUrl:client.app.asanaAuthorizeUrl(),
		user:null,
	};

	var token = req.cookies.token;
	if (req.cookies.token) {
		client.useOauth({ credentials: token });
		client.users.me().then(function(me) {
			viewData.user = me;
			res.render('login.hbs', viewData);
		}).catch(function(err) {
			//Handle err
		});
	} else {
		//reder view
		res.render('login.hbs', viewData);
	}





});

//router.use(someMiddleware);

module.exports = router;