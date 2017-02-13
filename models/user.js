var user = function(){
    this.name = null;
    this.age = 0;
};

user.prototype.setName = function(name){
    this.name = name;
};

user.prototype.setAge = function(age){
    this.age = age;
};


module.exports = user;