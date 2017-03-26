var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var asanaClient = require('../../helpers/asanaClient');

describe('OAuth Controller', function () {

	var OAuthCtrl,
		mockRequest,
		mockResponse,
		asanaClientStub,
		asanaAuthorizeUrlStub;

	beforeEach(function(){

		asanaAuthorizeUrlStub = "http://www.neverland.com";

		asanaClientStub = function(){
			return {
				app:
					{
						asanaAuthorizeUrl:function(){
							return asanaAuthorizeUrlStub
						}
					}
			};
		};


		mockRequest = sinon.stub().returns(
			{
				header:'fakeHeader'
			}
		);

		mockResponse = {

			_status:null,
			_json:null,
			_redirectUrl:null,
			_cookies:{},

			status:function(code){
				this._status = code;
				return this;
			},
			json:function(hash){
				this._json = hash;
				return this;
			},
			redirect:function(redirectUrl){
				this._redirectUrl = redirectUrl;
				return this;
			},
			cookie:function(key,val,options){
				this._cookies[key] =  val;
				return this;
			}
		};

		var OAuthController = proxyquire('../../controllers/OauthController',{'../helpers/asanaClient':asanaClientStub});
		OAuthCtrl = new OAuthController(mockRequest,mockResponse);

	});

	afterEach(function(){

	});

	it('Should redirect to asana Authorize Url',function(done){

		var retval = OAuthCtrl.loginWithAsana("fakeCode");
		//expect(asanaClientStub.called).toBeTruthy()
		expect(OAuthCtrl.response()._redirectUrl).toEqual(asanaAuthorizeUrlStub);
		done();
	});

	//it('Should convert an Asana access code to an acces token, set it as an HTTP only cookie, and redirect to our bash route',function(done){
	//
	//});


});