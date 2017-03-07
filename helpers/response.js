module.exports = function(res,code,data,msg){
	var r = res.json({
		code:code,
		data:data,
		msg:msg
	}).status(code);
	return r;
};
