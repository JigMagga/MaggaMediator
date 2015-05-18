'use strict';

var MaggaMediator = require('maggaMediator.js');

describe.only('connections', function() {
  it('host should connect', function() {
    if ((typeof (isBrowser) === 'undefined') || !isBrowser) {
      var serverMediator = new MaggaMediator();
      var sockjsServer = require('./../../plugins/sockjs/sockjs')();
      serverMediator.plugin(sockjsServer);
    }
  });

  describe('client should listen & publish', function() {
    var clientMediator = new MaggaMediator();
    it('client should listen ', function() {
      if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
        var sockjsClient = require('./../../plugins/sockjs/sockjs')();
        clientMediator.plugin(sockjsClient);
      }
    });

    it('client should publish ', function() {
      if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
        clientMediator.publish({event: 'publish', data: 'data', target: 123456});
      }
    });
  });
});
