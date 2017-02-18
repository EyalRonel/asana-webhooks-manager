/**
 * controllers/Index.js
 *
 * This file acts as the main export for all controllers and their routes
 * 1) Each file in the controllers is expected to export an instance of an express router with defined routes set it to.
 * 2) These files are then iterated on, and set as sub routes on the main router, by their file name.
 * 3) camelCase file names will be presented by a lower case, dash delimited routes. i.e camelCase -> camel-case
 *
 * Defining the main "/" route can be done by using a special file name - root.js
 * The router exported from this file will be set as "/" on the main application router
 * */


/**
 * Require dependencies
 * */
const routes = require('express').Router();
const changeCase = require('change-case');
const filesinFolder = require('require-dir')('./');

/**
 * Iterate all files and set their exported router on thr main application router
 * */
Object.keys(filesinFolder).forEach(function(routeName) {
    if (routeName == "root")
        routes.use('/', require('./'+routeName));
    else
        routes.use('/'+changeCase.paramCase(routeName), require('./'+routeName));

});

/**
 * Export the complete router with all routes back
 * */
module.exports = routes;