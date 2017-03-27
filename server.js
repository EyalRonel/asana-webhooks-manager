const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const registerRoutes = require('./routes');
var app = express();
var server = null;
var io;

if(!module.parent){
	server = app.listen(3000,function(){ console.log('AWM Server started!'); });

	app.use( bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

	app.use(express.static(__dirname + '/public'));
	app.use(cookieParser());

	io = require('socket.io')(server);

	//New incoming websocket connection
	io.on('connection', function(socket){

		socket.emit('event', 'can you hear me?', 1, 2, 'abc');

		//Register diconnect callback
		socket.on('disconnect', function() {
			socket.disconnect();
		});

	});


}
registerRoutes(app,io);





module.exports.app = app;