const router = require('express').Router();

// router.use(someMiddleware);

router.get('/', function(req,res){
	res.status(200).json({ message: 'users!' })
});

router.get('/:id',function(req,res){
	const userId = req.params.id
	res.status(200).json({message:userId});
});
module.exports = router;