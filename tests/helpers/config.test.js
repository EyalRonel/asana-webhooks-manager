/**
 * Libraries
 * */
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const expect = require('expect');

var fakeConfig={
	clientId: "ABCDEFG",
	clientSecret: "1234567",
	redirectUri: "http://www.fakeurl.com"
};

/**
 * Module under test, with stubs
 * */
const configHelper = proxyquire('../../helpers/configHelper', {'../config/asana':fakeConfig}
);


/**
 * Tests
 * */
describe('Config helper',function(){

	beforeEach(function () {

	});

	afterEach(function(){

	});

	it('Should return a client id',function(){
		expect(configHelper.getClientId()).toBe(fakeConfig.clientId);
	});

	it('Should return a client secret',function(){
		expect(configHelper.getClientSecret()).toBe(fakeConfig.clientSecret);
	});

	it('Should return a redirect uri',function(){
		expect(configHelper.getRediectUri()).toBe(fakeConfig.redirectUri);
	});

});
