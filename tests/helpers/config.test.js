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
 * Module under test
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

	it('Return a client id',function(){
		expect(configHelper.getClientId()).toBe(fakeConfig.clientId);
	});

	it('Return a client secret',function(){
		expect(configHelper.getClientSecret()).toBe(fakeConfig.clientSecret);
	});

	it('Return a redirect uri',function(){
		expect(configHelper.getRediectUri()).toBe(fakeConfig.redirectUri);
	});

});
