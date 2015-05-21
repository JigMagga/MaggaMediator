var MaggaMediator = require('maggaMediator.js');


describe('NestedObjects', function() {
  var maggaMediator = new MaggaMediator({plugins:['eventNamesSimple']});
  var eventNames = maggaMediator.eventNames;
  eventNames.add('foo.oft.bar.baz');
  eventNames.add('foo.oft.bar');
  eventNames.add('foo.oft.bal.ban');
  eventNames.add('foo.oft.bal.bak');
  eventNames.add('foo.oft.bat');
  eventNames.add('foo.oft.bay');

  it('should find leaf', function () {
    expect(eventNames.find('foo.oft.bar.baz')).to.have.length(1);
    expect(eventNames.find('foo.oft.bar.baz')).to.contain('foo.oft.bar.baz');
  });

  it('should find node', function () {
    expect(eventNames.find('foo.oft')).to.have.length(5);
    expect(eventNames.find('foo.oft')).to.contain
      .members([
        'foo.oft.bar.baz',
        'foo.oft.bal.ban',
        'foo.oft.bal.bak',
        'foo.oft.bat',
        'foo.oft.bay'
      ]);
    expect(eventNames.find('foo.oft')).to.not.include('foo.oft.bar.bal');
    expect(eventNames.find('foo.oft')).to.not.include('foo.oft.bar');
    expect(eventNames.find('foo.oft')).to.not.include('foo.oft');

  });
  it('should not find unknown leaf', function () {
    expect(eventNames.find('foo.NOToft')).to.be.empty;
  });
  it('should find the whole tree', function () {
    expect(eventNames.find()).to.have.length(5);
    expect(eventNames.find()).to.contain
      .members([
        'foo.oft.bar.baz',
        'foo.oft.bal.ban',
        'foo.oft.bal.bak',
        'foo.oft.bat',
        'foo.oft.bay'
      ]);
  });

  it('should delete single leaf', function () {
    eventNames.delete('foo.oft.bat');
    expect(eventNames.find()).to.have.length(4);
    expect(eventNames.find('foo.oft.bat')).to.be.empty;
  });
  it('should delete node', function () {
    eventNames.delete('foo.oft.bal');
    expect(eventNames.find()).to.have.length(2);
    expect(eventNames.find('foo.oft.bal')).to.be.empty;
  });
  it('should delete unknown leaf', function () {
    expect(function(){return eventNames.delete('foo.oft.bal')}).to.not.throw(Error);
  });

});




describe('Event names Simple', function() {
  var EVENT_NAME_ONE = 'Event.One',
    EVENT_NAME_TWO = 'Event.Two';


  var maggaMediator = new MaggaMediator({plugins:['simple','dispatcherSimple','eventNamesSimple']});
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
      expect(maggaMediator.eventNames).to.have.property('delete').be.a('function');
    });
  });

  describe('EventNames operations', function() {
    maggaMediator.eventNames.add(EVENT_NAME_ONE);
    it('should add eventName successfully', function () {
      expect(maggaMediator.eventNames.find(EVENT_NAME_ONE)).to.contain(EVENT_NAME_ONE);
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

  describe('Two channels.', function(){
    var maggaMediator = new MaggaMediator({plugins:['simple','dispatcherSimple','eventNamesSimple']});
    var CHANNEL_NAME_ONE = 'channel.one',
      CHANNEL_NAME_TWO = 'channel.two',
      CHANNEL_NAME_COMMON = 'channel',
      MESSAGE_ONE = 'Message one',
      MESSAGE_TWO = 'Message two',
      MESSAGE_COMMON = 'Message common',
      mediatorListnerOne = [],
      mediatorListnerTwo = [],
      callbackOne = function(msg){ mediatorListnerOne.push(msg)};
    it('should subscribe and publish to different channels successfully',function(){
      maggaMediator.subscribe(CHANNEL_NAME_ONE, callbackOne);
      maggaMediator.subscribe(CHANNEL_NAME_TWO, function(msg){ mediatorListnerTwo.push(msg)});
      maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
      maggaMediator.publish(CHANNEL_NAME_TWO, MESSAGE_TWO);
      expect(mediatorListnerOne).to.have.length(1);
      expect(mediatorListnerTwo).to.have.length(1);
      assert.equal(mediatorListnerOne[0] ,MESSAGE_ONE,"Message one check");
      assert.equal(mediatorListnerTwo[0] ,MESSAGE_TWO,"Message two check");
    });

    it('should publish to both channels successfully',function(){
      maggaMediator.publish(CHANNEL_NAME_COMMON, MESSAGE_COMMON);
      expect(mediatorListnerOne).to.have.length(2);
      expect(mediatorListnerTwo).to.have.length(2);
      assert.equal(mediatorListnerOne[1] ,MESSAGE_COMMON,"Channel one check");
      assert.equal(mediatorListnerTwo[1] ,MESSAGE_COMMON,"Channel two check");
    });



    it('should unsubscribe from channel successfully',function(){
      expect(mediatorListnerOne).to.have.length(2);
      maggaMediator.unsubscribe(CHANNEL_NAME_ONE, callbackOne);
      maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
      expect(mediatorListnerOne).to.have.length(2);
    });
  });
});


