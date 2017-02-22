module.exports = function (req, res, next) {
	if (!req.cookies.token) return res.status(400).json({msg:"Access denied"});
	else next();
};
