'use strict';

const AWMController = require('./AWMController');
const asanaClient = require('../helpers/asanaClient');

class OauthController extends AWMController {

	constructor(req, res) {
		super(req, res);

	}

	loginWithAsana() {
		var client = asanaClient();
		return this._response.redirect(client.app.asanaAuthorizeUrl())
	}

	accessTokenFromCode(code) {
		var client = asanaClient();
		return client.app.accessTokenFromCode(code).then(
			function (credentials) {

				//Set a secure HTTP Only cookie to hold the token
				this._response.cookie('token', credentials.access_token, {
					httpOnly: true,
					secure: true,
					maxAge: 60 * 60 * 1000
				});

				//Set a utility cookie that expires along with the token, yet accessible to the client via javascript
				this._response.cookie('awm_login', true, {maxAge: 60 * 60 * 1000});

				//Rediect to app
				this._response.redirect('/');

			}.bind(this),
			function (res) {
				this.reply(400,{},'Error getting authorization: ' + req.query.error);
			}.bind(this)
		);
	}
}

module.exports = OauthController;