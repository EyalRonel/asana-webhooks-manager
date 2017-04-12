module.exports = {
	_of:'',
	of:function(namepsapce){
		this._of = namepsapce;
		return {
			emit: function(namespace,payload){
				//Do nothing
			}
		}
	}
};