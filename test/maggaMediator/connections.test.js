'use strict';

var MaggaMediator = require('maggaMediator.js');

describe.only('connections', function () {

  describe('server', function() {
    if ((typeof (isBrowser) === 'undefined') || !isBrowser) {
      it('host should connect', function () {
        var serverMediator = new MaggaMediator({
          plugins: {
            sockjs: {
              host: 'localhost',
              port: 8080,
              path: '/mediator',
              permissions: {
                publish: 'on'
              }
            }
          }
        });
      });
    }
  });

  describe('client', function () {
    if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
      var clientMediator = null;
      it('should connect', function () {
        clientMediator = new MaggaMediator({plugins: ['simple', 'sockjs']});
      });
      it('should subscribe', function () {
        clientMediator.subscribe('publish1', function () {
          console.log('subscribed to a publish event');
        });
      });
      it('should publish ', function () {
        console.log('smthg published');
        clientMediator.publish('publish1', {foo: 'bar'});
      });
    }
  });
});
