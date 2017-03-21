const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const registerRoutes = require('./routes');

var app = express();

app.use( bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies


app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

registerRoutes(app);

if(!module.parent){ app.listen(3000,function(){
	console.log('AWM Server started!');
	});
}

module.exports.app = app;