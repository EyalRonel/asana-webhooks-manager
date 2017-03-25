/**
 * Libraries
 * */
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const expect = require('expect');

const asana = require('asana');
const asanaClient = require('../../helpers/asanaClient');

/**
 * Tests
 * */
describe('Asana helper',function(){

	it('Should return an instance of Asana client',function(){
		expect(asanaClient('fakeToken') instanceof asana.Client).toBeTruthy();
	});

});
