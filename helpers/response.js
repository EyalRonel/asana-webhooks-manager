module.exports = function(res,code,data,msg){
	 return res.status(code).json({
		code:code,
		data:data,
		msg:msg
	});
};
