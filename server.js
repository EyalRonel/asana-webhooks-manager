const express = require('express');
const config = require('./config/index');
//const hbs = require('hbs');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser')

const tempRoute = require('./routes/temp');

var app = express();

//hbs.registerPartials(__dirname+'/views/partials');

//app.set('view engine','hbs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));   // to support URL-encoded bodies


app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

tempRoute(app);
app.use('/',routes);





if(!module.parent){ app.listen(3000,function(){
	console.log('App running...!');
	});
}



module.exports.app = app;