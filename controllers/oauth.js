module.exports = function(router){
    router.route('/')
        .get(function(req, res, next) {
            res.send("get oauth");
        }).post(function(req, res, next) {
        res.send("post best");
    });
};