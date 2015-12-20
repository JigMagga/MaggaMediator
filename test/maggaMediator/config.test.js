'use strict';
var MaggaMediator = require('../../dist/maggaMediator.js');

describe('Config', function() {
  describe('Create', function() {
    var maggaMediator = new MaggaMediator();
    describe('maggaMediator exists', function() {
      it('should mediator exist',function(){
        expect(maggaMediator).to.exist;
      });
    })
  });

  describe('Config', function() {
    var maggaMediator = new MaggaMediator();

    // Assign config
    it('should assign config properly',function(){
      maggaMediator.config({foo:'bar',baz:1});
      assert.equal(maggaMediator.config().foo,'bar',"Check after assigning config #1");
      assert.equal(maggaMediator.config().baz,1,"Check after assigning config #2");
    });
    //console.log('maggaMediator.config()',maggaMediator.config())

    it('should extend config properly',function(){
      maggaMediator.config({foo:'newBar',buz:'bar'});
      assert.equal(maggaMediator.config().foo,'newBar',"Check after reassigning config. New value of existing key.");
      assert.equal(maggaMediator.config().buz,'bar',"Check after reassigning config. New key.");
      assert.equal(maggaMediator.config().baz,1,"Check after reassigning config old value which wasn't in new config.");
    });
  });

  describe("Loading plugins config styles",function(){


    it("should create mediator with array-type enumeration", function(){
      var fn = function (){
        return new MaggaMediator({loadPlugins:['simple']});
      }
      expect(fn).to.not.throw(Error);
    });
    it("should create mediator with object-type enumeration", function(){
      var fn = function (){
        return new MaggaMediator({plugins:{'simple':{}}});
      }
      expect(fn).to.not.throw(Error);
    });
    it("should throw error on string value of plugins", function(){
      var fn = function (){
        return new MaggaMediator({plugins:"simple"});
      }
      expect(fn).to.throw(Error);
    });
  });
});
