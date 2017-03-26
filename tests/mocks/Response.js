module.exports = {

	_status:null,
	_json:null,
	_redirectUrl:null,
	_cookies:{},
	_headers:{},
	_sendFile:null,

	status:function(code){
		this._status = code;
		return this;
	},
	json:function(hash){
		this._json = hash;
		return this;
	},
	redirect:function(redirectUrl){
		this._redirectUrl = redirectUrl;
		return this;
	},
	cookie:function(key,val,options){
		this._cookies[key] =  val;
		return this;
	},
	sendFile:function(pathToFile){
		this._sendFile = pathToFile;
		return this;
	},
	set:function(key,val){
		this._headers[key] = val;
		return this;
	},
	get:function(key){
		if (this._headers.hasOwnProperty(key)) return this._headers[key];
		else return null;
	}

};