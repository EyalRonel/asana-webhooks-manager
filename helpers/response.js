module.exports = function(res,code,data,msg){
	var r = res.status(code).json({
		code:code,
		data:data,
		msg:msg
	});
	return r;
};
