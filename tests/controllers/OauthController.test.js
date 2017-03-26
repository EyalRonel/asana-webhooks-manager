var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var mockResponse = require('../mocks/Response');
var mockRequest = require('../mocks/Request');

var asanaClient = require('../../helpers/asanaClient');


describe('OAuth Controller', function () {

	var OAuthCtrl;

	beforeEach(function(){});

	afterEach(function(){});

	it('Should redirect to asana Authorize Url',function(done){

		var asanaAuthorizeUrlStub = "http://www.neverland.com";

		var asanaClientStub = function(){
			return {
				app:
				{
					asanaAuthorizeUrl:function(){
						return asanaAuthorizeUrlStub
					}
				}
			};
		};

		var OAuthController = proxyquire('../../controllers/OauthController',{'../helpers/asanaClient':asanaClientStub});
		OAuthCtrl = new OAuthController(mockRequest,mockResponse);

		OAuthCtrl.loginWithAsana();
		expect(OAuthCtrl.response()._redirectUrl).toEqual(asanaAuthorizeUrlStub);
		done();

	});

	it('Should convert code to token and save it as a cookie, then redirect to main app route (/)',function(done){

		var asanaClientStub = function(){
			return {
				app:
				{
					accessTokenFromCode:function(){
						return new Promise(function(resolve,reject){
							setTimeout(function(){
								resolve({access_token:"fakeToken"});
							},0);
						});
					}
				}
			};
		};

		var OAuthController = proxyquire('../../controllers/OauthController',{'../helpers/asanaClient':asanaClientStub});
		OAuthCtrl = new OAuthController(mockRequest,mockResponse);

		OAuthCtrl.accessTokenFromCode("fakeCode")
			.then(function(response){
				expect(OAuthCtrl.response()._cookies.hasOwnProperty('token')).toBeTruthy();
				expect(OAuthCtrl.response()._cookies.hasOwnProperty('awm_login')).toBeTruthy("Missing awm_login cookie!");
				expect(OAuthCtrl.response()._redirectUrl).toEqual("/");
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

});