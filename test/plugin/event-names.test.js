var MaggaMediator = require('maggaMediator.js');

describe('Event names Simple', function() {
  var EVENT_NAME_ONE = 'EventOne',
    EVENT_NAME_TWO = 'EventTwo';


  var maggaMediator = new MaggaMediator({plugins:['simple','eventNamesSimple']});
  describe('EventNames in maggaMediator exists', function() {
    it('should EventNames exist',function(){
      expect(maggaMediator).to.have.property('eventNames');
    });
    it('should EventNames have add method',function(){
      expect(maggaMediator.eventNames).to.have.property('add').be.a('function');
    });
    it('should EventNames have find method',function(){
      expect(maggaMediator.eventNames).to.have.property('find').be.a('function');
    });
    it('should EventNames have erase method',function(){
      expect(maggaMediator.eventNames).to.have.property('erase').be.a('function');
    });
  });

  describe('EventNames operations', function() {
    maggaMediator.eventNames.add(EVENT_NAME_ONE);
    it('should add eventName successfully', function () {
      expect(maggaMediator.eventNames._eventNames).to.have.property(EVENT_NAME_ONE);
    });

    it('should find eventName successfully', function () {
      var result = maggaMediator.eventNames.find(EVENT_NAME_ONE);
      expect(result).to.be.a('array');
      expect(result).to.deep.equal([EVENT_NAME_ONE]);
    });

    it('should return [] for find non existing eventName', function () {
      var result = maggaMediator.eventNames.find(EVENT_NAME_TWO);
      expect(result).to.be.a('array');
      expect(result).to.be.empty;
    });



  });



});


