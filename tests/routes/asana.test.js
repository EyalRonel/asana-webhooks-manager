const request = require('supertest');
const expect = require('expect');
var app = require('../../server.js').app;
var nock = require('nock');

var asanaApi = nock('https://app.asana.com/api/1.0/')
	.get('/users/me')
	.reply(200,
		{
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
		}
	);


describe('Asana Routes',function(){

	it('Makre sure a token is present',(done) => {
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
				if (res.body.data.name != "Greg Sanchez") throw new Error('Wrong user');
			})
			.expect(200,done);
	});

});
