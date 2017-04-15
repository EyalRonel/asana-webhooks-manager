/**
 * Libraries
 * */
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const expect = require('expect');

var mongoDBHelper;
/**
 * Tests
 * */
describe('MongoDB helper',function(){

	beforeEach(function () {
	});

	afterEach(function(){

	});

	it('Should return a mongoose connection',function(){

		var mongoose = require('mongoose');
		var mongooseStub = sinon.stub(mongoose,'connect').callsFake(function(){return {}});
		var mongoDBHelper = proxyquire('../../helpers/mongodbHelper',{'mongoose':mongooseStub});

		var mongoConnection = mongoDBHelper.getConnection();
		expect(mongooseStub.calledOnce).toBeTruthy();
		mongooseStub.restore();

	});

	it('Should return a mongoDB connection string with username / password',function(){
		var fakeConfig={
			username: "someUser",
			password: "somePass",
			host: "127.0.0.1",
			port: "27017",
			database: "awm"
		};
		mongoDBHelper = proxyquire('../../helpers/mongodbHelper', {'../config/mongodb':fakeConfig});
		expect(mongoDBHelper.getMongoDBConnectionString()).toBe("mongodb://someUser:somePass@127.0.0.1:27017/awm");
	});

	it('Should return a mongoDB connection string without a user / password if values were not set for these keys',function(){
		var fakeConfig={
			username: null,
			password: null,
			host: "127.0.0.1",
			port: "27017",
			database: "awm"
		};
		mongoDBHelper = proxyquire('../../helpers/mongodbHelper', {'../config/mongodb':fakeConfig});
		expect(mongoDBHelper.getMongoDBConnectionString()).toBe("mongodb://127.0.0.1:27017/awm");
	});

	it('Should use default values for host and port if non were defined',function(){
		var fakeConfig={
			username: null,
			password: null,
			host: null,
			port: null,
			database: "awm"
		};
		mongoDBHelper = proxyquire('../../helpers/mongodbHelper', {'../config/mongodb':fakeConfig});
		expect(mongoDBHelper.getMongoDBConnectionString()).toBe("mongodb://127.0.0.1:27017/awm");
	});

	it('Should throw an error if now database name was not set',function(){
		var fakeConfig={
			username: null,
			password: null,
			host: null,
			port: null,
			database: null
		};
		mongoDBHelper = proxyquire('../../helpers/mongodbHelper', {'../config/mongodb':fakeConfig});

		var throwingMethod = function(){
			mongoDBHelper.getMongoDBConnectionString();
		};

		expect(throwingMethod).toThrow(/Missing mongodb database configuration/);

	});



});
