var ModuleA = require('./moduleA');

class ModuleB {

	pad(string){
		var ma = new ModuleA();
		return ma.x(string);
	}
	
}

module.exports = ModuleB;