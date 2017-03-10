const AWMController = require('./AWMController');
const asanaClient = require('../helpers/asanaClient');

class OauthController extends AWMController{

	constructor(req,res){
		super(req,res);

	}

	login(){
		var client = asanaClient();
		return this._response.redirect(client.app.asanaAuthorizeUrl())
	}

	test() {
		return this.response(200,{},"BYE");
	}

}

module.exports = OauthController;