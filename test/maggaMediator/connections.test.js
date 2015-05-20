'use strict';

var MaggaMediator = require('maggaMediator.js');
var sockjspluginConfig = {
  plugins: {
    "sockjs": {
      host: 'localhost',
      port: 8080,
      path: '/mediator',
      permissions: {
        publish: 'on'
      }
    }
  }
};

describe('connections', function () {

  describe('server', function () {
    if ((typeof (isBrowser) === 'undefined') || !isBrowser) {
      it('host should connect', function () {
        var serverMediator = new MaggaMediator(sockjspluginConfig);
      });
    }
  });

  describe('client', function () {
    if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
      var clientMediator;
      it('should connect', function () {
        var serverMediator = new MaggaMediator(sockjspluginConfig);
        clientMediator = new MaggaMediator(sockjspluginConfig);
        clientMediator.subscribe('publish', function () {
          console.log('subscribed to a publish event');
          clientMediator.publish('publish1', {foo: 'bar'});
        });
      });
      it('should subscribe', function () {
        clientMediator.subscribe('publish', function () {
          console.log('subscribed to a publish event');
        });
      });
      it.skip('should publish ', function () {
        clientMediator = new MaggaMediator(sockjspluginConfig);
        clientMediator.publish('publish', {foo: 'bar'});
      });
    }
  });
});
