var QUnit = require('qunitjs');
var MaggaMediator = require('../maggaMediator');

QUnit.module( "MaggaMediator", {
    beforeEach: function( assert ) {
        //stub
    },
    afterEach: function( assert ) {
        //stub
    }
});


QUnit.test( "Config", function( assert ) {
    assert.expect( 6 );

    var maggaMediator = new MaggaMediator();
    assert.ok( typeof maggaMediator !== 'undefined', "maggaMediator exists" );

    maggaMediator.config({foo:'bar',baz:1});
    assert.equal(maggaMediator.config().foo,'bar',"Check after assigning config #1");
    assert.equal(maggaMediator.config().baz,1,"Check after assigning config #2");

    maggaMediator.config({foo:'newBar',buz:'bar'});
    assert.equal(maggaMediator.config().foo,'newBar',"Check after reassigning config. New value of existing key.");
    assert.equal(maggaMediator.config().foo,'newBar',"Check after reassigning config. New key.");
    assert.equal(maggaMediator.config().baz,1,"Check after reassigning config old value which wasn't in new config.");
});

QUnit.test( "Subscribe and publish", function( assert ) {
    assert.expect( 5 );

    var maggaMediator = new MaggaMediator();
    var mediatorListner = [];

    assert.ok( typeof maggaMediator.subscribe !== 'undefined', "maggaMediator.subscribe exists" );
    assert.ok( typeof maggaMediator.publish !== 'undefined', "maggaMediator.publish exists" );

    maggaMediator.subscribe("channel", function(msg){ mediatorListner.push(msg)});

    maggaMediator.publish("channel", "Message one");
    maggaMediator.publish("channel", "Message two");

    assert.equal(mediatorListner.length,2,"After pablishing of two messages we have 2 items in mediatorListner");
    assert.equal(mediatorListner[0] ,"Message one","Message one check");
    assert.equal(mediatorListner[1] ,"Message two","Message two check");

});