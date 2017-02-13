const expect = require('expect');
const helper = require('../../helpers/helper');

describe('helper',function(){

    it('should add two numbers',function(){
        var result = helper.add(3,3);
        expect(result).toBe(6);
    });

});
