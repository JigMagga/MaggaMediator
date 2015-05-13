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