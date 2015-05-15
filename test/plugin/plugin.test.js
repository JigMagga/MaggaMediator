sinon = require('sinon');
chai = require('chai');
// expert some variables not to require them in all tests
assert = chai.assert;
expect = chai.expect;
should = chai.should();



var MaggaMediator = require('maggaMediator.js');

describe('Plugin', function() {
    var maggaMediator = new MaggaMediator();
    var callbackInit = sinon.spy();
    var myPlugin = {
        init: callbackInit
    }

    // Assign config
    it('should call plugin init',function(){
      maggaMediator.plugin(myPlugin);
      expect(callbackInit.called).to.be.true;
    });

})