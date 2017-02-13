const express = require('express');
const config = require('./config/index');
const routes = require('require-dir')();
const hbs = require('hbs');

var app = express();

require('./controllers/index')(app);

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');

app.listen(3000);
console.log('App running...!');