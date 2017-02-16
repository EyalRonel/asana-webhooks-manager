const router = require('express').Router();

//router.use(someMiddleware);

router.get('/', function(req,res){
	//res.status(200).json({ message: 'root!' })
	res.render('login.hbs', {'greeting':'Hello'});
});

module.exports = router;