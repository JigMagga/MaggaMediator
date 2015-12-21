var MaggaMediator = require('../../src/maggaMediator.js');

describe('Create.', function() {
    var maggaMediator = new MaggaMediator();
    describe('maggaMediator exists', function() {
        it('should mediator exist',function(){
            expect(maggaMediator).to.exist;
        });
    })
});

describe('Subscribe and publish.', function() {
    var maggaMediator = new MaggaMediator();
    var CHANNEL_NAME_ONE = 'channel:one',
        CHANNEL_NAME_TWO = 'channel:two',
        MESSAGE_ONE = 'Message one',
        MESSAGE_TWO = 'Message two',
        mediatorListnerOne = mediatorListnerTwo = [];

    // Assign config
    it('should exist methods subscribe, unsubscribe and publish',function(){
        expect(maggaMediator).to.have.property('subscribe');
        expect(maggaMediator).to.have.property('unsubscribe');
        expect(maggaMediator).to.have.property('publish');

    });


    describe('One channel', function(){
        var maggaMediator = new MaggaMediator();
        var CHANNEL_NAME_ONE = 'channel:one',
            MESSAGE_ONE = 'Message one',
            MESSAGE_TWO = 'Message two',
            mediatorListnerOne = [],
            callbackOne = function(msg){
                mediatorListnerOne.push(msg)
            };
        it('should subscribe and publish to channel successfully',function(){
            maggaMediator.subscribe(CHANNEL_NAME_ONE, callbackOne);
            maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
            maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_TWO);
            expect(mediatorListnerOne).have.length(2);
            assert.equal(mediatorListnerOne[0] ,MESSAGE_ONE,"Message one check");
            assert.equal(mediatorListnerOne[1] ,MESSAGE_TWO,"Message two check");
        });
    });

    describe('Two channels.', function(){
        var maggaMediator = new MaggaMediator();
        var CHANNEL_NAME_ONE = 'channel:one',
            CHANNEL_NAME_TWO = 'channel:two',
            MESSAGE_ONE = 'Message one',
            MESSAGE_TWO = 'Message two',
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
        it('should unsubscribe from channel successfully',function(){
            expect(mediatorListnerOne).to.have.length(1);
            maggaMediator.unsubscribe(CHANNEL_NAME_ONE, callbackOne);
            maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
            expect(mediatorListnerOne).to.have.length(1);
        });

    });
});





