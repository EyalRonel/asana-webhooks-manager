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

var incompleteConfig={
	clientId: "ABCDEFG",
	clientSecret: "",
	redirectUri: null
};

/**
 * Module under test, with stubs
 * */
var configHelper = proxyquire('../../helpers/configHelper', {'../config/asana':fakeConfig});


/**
 * Tests
 * */
describe('Config helper',function(){

	beforeEach(function () {
		var configHelper = proxyquire('../../helpers/configHelper', {'../config/asana':fakeConfig});
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

	it('Should return a "ready" if all configurations were specified',function(){
		var configHelper = proxyquire('../../helpers/configHelper', {'../config/asana':fakeConfig});
		expect(configHelper.isReady()).toBe(true);
	});

	it('Should return a "not ready" if configurations were not specified',function(){
		var configHelper = proxyquire('../../helpers/configHelper', {'../config/asana':incompleteConfig});
		expect(configHelper.isReady()).toBe(false);
	});

});
