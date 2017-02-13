const util = require('util');
const User = require('./user');

var newUser = function(){

    User.call(this);

};

util.inherits(newUser, User);

module.exports = newUser;