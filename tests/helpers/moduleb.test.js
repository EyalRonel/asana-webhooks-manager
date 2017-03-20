const sinon = require('sinon');
const expect = require('expect');
const ModuleB = require('../../helpers/moduleB');
const ModuleA = require('../../helpers/moduleA');

describe('ModuleB',function(){

	it('should pad string with xxx both sides',function(){

		var stub = sinon.stub(ModuleA.prototype, 'x').returns('bye');

		var myMB = new ModuleB();
		var result = myMB.pad("hello");

		sinon.assert.calledOnce(ModuleA.prototype.x);
		expect(result).toBe("bye");
		stub.restore();

	});

});
