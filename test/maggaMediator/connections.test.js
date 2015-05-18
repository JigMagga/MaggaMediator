var MaggaMediator = require('./../../src/maggaMediator');

describe('connections', function () {
  var maggaMediator = new MaggaMediator();

  it('should establish connect', function () {
    var sockjs = require('./../../plugins/sockjs/sockjs')();
    maggaMediator.plugin(sockjs);
  });
});