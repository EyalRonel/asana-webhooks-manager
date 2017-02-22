const AWMController = require('./AWMController');

class RootController extends AWMController{

	constructor(req,res){
		super(req,res);

	}

	test() {
		return this.response(200,{},"BYE");
	}

}

module.exports = RootController;