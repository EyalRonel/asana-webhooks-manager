const request = require('supertest');
const expect = require('expect');
var app = require('../../server.js').app;
var nock = require('nock');


/**
 * mockResponse - A mock response object to test against
 * */
var mockResponse = 		{
	"data": {
		"workspaces": [
			{
				"id": 1337,
				"name": "My Favorite Workspace"
			}
		],
		"id": 5678,
		"name": "Greg Sanchez",
		"email": "gsanchez@example.com"
	}
};

/**
 * Define mock API response using Nock
 * */
var asanaApi = nock('https://app.asana.com/api/1.0/')
	.get('/users/me')
	.reply(200,mockResponse);


/**
 * Tests for routes/asana.js
 * */
describe('Asana Routes',function(){

	it('Should prevent access for requests without a tokent',(done) => {
		request(app)
			.get("/asana/me")
			.expect(400)
			.expect({msg:"Access denied"})
			.end(done);
	});

	it('Should return the current user',(done) => {
		request(app)
			.get("/asana/me")
			.set('Cookie',['token=123456'])
			.expect(function(res){
				if (res.body.data.id != mockResponse.data.id) throw new Error('Wrong id');
				if (res.body.data.name != mockResponse.data.name) throw new Error('Wrong user name');
				if (res.body.data.email != mockResponse.data.email) throw new Error('Wrong email');
				if (res.body.data.workspaces[0].id != mockResponse.data.workspaces[0].id) throw new Error('Invalid workspaces');
			})
			.expect(200,done);
	});

});
