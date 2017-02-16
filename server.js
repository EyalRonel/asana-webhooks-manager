const express = require('express');
const config = require('./config/index');
const hbs = require('hbs');
const routes = require('./controllers');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');

app.use('/',routes);

app.listen(3000);
console.log('App running...!');