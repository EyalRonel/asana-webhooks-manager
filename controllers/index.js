const express = require('express');
const changeCase = require('change-case');
const routes = require('require-dir')();


module.exports = function(app) {
    'use strict';

    // Initialize all routes
    Object.keys(routes).forEach(function(routeName) {

        var router = express.Router();
        // You can add some middleware here
        // router.use(someMiddleware);

        // Initialize the route to add its functionality to router
        require('./' + routeName)(router);

        // Add router to the speficied route name in the app
        app.use('/' + changeCase.paramCase(routeName), router);
    });
};