module.exports = {

	_headers:{},

	get:function(key){
		if (this._headers.hasOwnProperty(key)) return this._headers[key];
		else return null;
	},
	set:function(key,val){
		this._headers[key] = val;
		return this;
	}

};