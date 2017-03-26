module.exports = {

	headers:{},
	cookies:{},

	cookie:function(key,val,options){
		this.cookies[key] =  val;
		return this;
	},

	get:function(key){
		if (this.headers.hasOwnProperty(key)) return this.headers[key];
		else return null;
	},
	set:function(key,val){
		this.headers[key] = val;
		return this;
	}

};