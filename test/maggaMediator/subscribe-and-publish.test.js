var MaggaMediator = require('maggaMediator.js');

describe('Create', function() {
    var maggaMediator = new MaggaMediator();
    describe('maggaMediator exists', function() {
        it('should mediator exist',function(){
            should.exist(maggaMediator);
        });
    })
});

describe('Subscribe and publish', function() {
    var maggaMediator = new MaggaMediator();
    var CHANNEL_NAME = 'channel',
        MESSAGE_ONE = 'Message one',
        MESSAGE_TWO = 'Message two',
        mediatorListner = [];

    // Assign config
    it('should exist methods subscribe and publish',function(){
        should.exist(maggaMediator.subscribe);
        should.exist(maggaMediator.publish);
    });


    it('should subscribe and publish to the channel successfully',function(){
        maggaMediator.subscribe(CHANNEL_NAME, function(msg){ mediatorListner.push(msg)});
        maggaMediator.publish(CHANNEL_NAME, MESSAGE_ONE);
        maggaMediator.publish(CHANNEL_NAME, MESSAGE_TWO);
        mediatorListner.should.have.length(2);
        assert.equal(mediatorListner[0] ,MESSAGE_ONE,"Message one check");
        assert.equal(mediatorListner[1] ,MESSAGE_TWO,"Message two check");
    });
});




