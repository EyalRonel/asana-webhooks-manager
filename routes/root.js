const router = require('express').Router();
const path    = require("path");
const asanaClient = require('../helpers/asanaClient');

router.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'../public/client/views','index.html'));
});

router.get('/server', function(req,res){

	var client = asanaClient();

	var viewData = {
		asanaAuthorizeUrl:client.app.asanaAuthorizeUrl(),
		user:null
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

router.get('/test',function(req,res,next){

	const rootController = require('../controllers/root');
	var rootCtrl =  new rootController(req,res).test();



});

module.exports = router;