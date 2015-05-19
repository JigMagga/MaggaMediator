var MaggaMediator = require('maggaMediator.js');

describe('Bacon mediator plugin', function(){
    var maggaMediator = new MaggaMediator({"plugins":['baconjs']});
    var CHANNEL_NAME_ONE = 'channel:one',
        CHANNEL_NAME_TWO = 'channel:two',
        MESSAGE_ONE = 'Message one',
        MESSAGE_TWO = 'Message two',
        mediatorListnerOne = [],
        mediatorListnerTwo = [],
        EventStreamListnerOne = [],
        EventStreamListnerTwo = [],
        BusListner = [],
        callbackOne = function(msg){ mediatorListnerOne.push(msg)};

    it('should have method getEventStream',function(){
        expect(maggaMediator).to.have.property('getEventStream');
        expect(maggaMediator.getEventStream).to.be.a('function');
    });

    describe('should subscribe and publish to different channels successfully',function(){
        maggaMediator.subscribe(CHANNEL_NAME_ONE, callbackOne);
        maggaMediator.subscribe(CHANNEL_NAME_TWO, function(msg){ mediatorListnerTwo.push(msg)});

        // We will listen only MESSAGE_ONE but on Bus stream
        maggaMediator.getEventStream()
            .filter(function(value){
                return value === MESSAGE_ONE;
            })
            .onValue(function(value){
                BusListner.push(value);
            });


        maggaMediator.getEventStream(CHANNEL_NAME_ONE).onValue(function(value){
            EventStreamListnerOne.push(value);
        });

        maggaMediator.getEventStream(CHANNEL_NAME_TWO).onValue(function(value){
            EventStreamListnerTwo.push(value);
        });
        // publishing
        maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
        maggaMediator.publish(CHANNEL_NAME_TWO, MESSAGE_TWO);
        maggaMediator.publish(CHANNEL_NAME_TWO, MESSAGE_TWO);

        // StreamListners tests
        it('should StreamListners have proper length',function(){
            expect(EventStreamListnerOne).to.have.length(1);
            expect(EventStreamListnerTwo).to.have.length(2);
            expect(BusListner).to.have.length(1);
        });

        it('should StreamListners have proper values',function(){
            expect(EventStreamListnerOne[0]).to.equal(MESSAGE_ONE);
            expect(EventStreamListnerTwo[0]).to.equal(MESSAGE_TWO);
            expect(BusListner[0]).to.equal(MESSAGE_ONE);
        });

        // additional check of general stuff
        it('should mediatorListners have proper length and values',function(){
            expect(mediatorListnerOne).to.have.length(1);
            expect(mediatorListnerTwo).to.have.length(2);
            assert.equal(mediatorListnerOne[0] ,MESSAGE_ONE,"Message one check");
            assert.equal(mediatorListnerTwo[0] ,MESSAGE_TWO,"Message two check");
        });

    });
    describe('should unsubscribe from channel successfully',function(){
        it('should unsubscribe from channel successfully',function(){
            //expect(maggaMediator[CHANNEL_NAME_ONE]).to.have.property('subscribers').with.property('length');
            //var subsLength = maggaMediator[CHANNEL_NAME_ONE].subscribers.length;
            expect(mediatorListnerOne).to.have.length(1);
            maggaMediator.unsubscribe(CHANNEL_NAME_ONE, callbackOne);
            maggaMediator.publish(CHANNEL_NAME_ONE, MESSAGE_ONE);
            expect(mediatorListnerOne).to.have.length(1);
            //maggaMediator[CHANNEL_NAME_ONE].subscribers.should.have.length(subsLength-1);
        });

    });

});
