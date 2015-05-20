var MaggaMediator = require('maggaMediator.js');

describe('Permitions Simple', function() {
  var CHANNEL_NAME_ONE = 'channel:one',
    CHANNEL_NAME_TWO = 'channel:two',
    MESSAGE_ONE = 'Message one',
    MESSAGE_TWO = 'Message two',
    mediatorListnerOne = [],
    mediatorListnerTwo = [],
    callbackOne = function(msg){ mediatorListnerOne.push(msg)};

  var maggaMediator = new MaggaMediator({
    plugins:['simple','permissionsSimple','dispatcherSimple'],
    permissions:{
      "*":false,
      "eventnames":{
        "channel:one": "on.subscribe,publish"
      }
    }
  });
  describe('permittions in maggaMediator exists', function() {
    it("should mediator have property permissions",function(){
      expect(maggaMediator).to.have.property('permissions');
    });
    it('should subscribe and publish to different channels successfully',function(){
      maggaMediator.subscribe(CHANNEL_NAME_ONE, callbackOne);
      maggaMediator.subscribe(CHANNEL_NAME_TWO, function(msg){ mediatorListnerTwo.push(msg)});
      maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
      maggaMediator.publish(CHANNEL_NAME_TWO, MESSAGE_TWO);
      expect(mediatorListnerOne).to.have.length(1);
      expect(mediatorListnerTwo).to.have.length(0);
      assert.equal(mediatorListnerOne[0] ,MESSAGE_ONE,"Message one check");
      //assert.equal(mediatorListnerTwo[0] ,MESSAGE_TWO,"Message two check");
    });
    it('should unsubscribe from channel successfully',function(){
      expect(mediatorListnerOne).to.have.length(1);
      maggaMediator.unsubscribe(CHANNEL_NAME_ONE, callbackOne);
      maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
      expect(mediatorListnerOne).to.have.length(2);
    });

  });

  describe('EventNames operations', function() {


  });



});


