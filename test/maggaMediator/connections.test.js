var MaggaMediator = require('./../../src/maggaMediator');

describe('connections', function () {
  var maggaMediator = new MaggaMediator({plugins:['simple','sockjs']});
  it('should establish connect', function () {
    //var sockjs = require('./../../plugins/sockjs/sockjs')();
    //maggaMediator.plugin(sockjs);
    //maggaMediator

  });
});