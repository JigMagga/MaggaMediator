'use strict';

var MaggaMediator = require('maggaMediator.js');

describe.only('connections', function() {
  it('host should connect', function() {
    if ((typeof (isBrowser) === 'undefined') || !isBrowser) {
      var serverMediator = new MaggaMediator();
      serverMediator.config({
        type: 'sockJS',
        host: 'localhost',
        port: 8080,
        path: '/mediator',
        permissions:{
          publish: 'on'
        }
      });
      serverMediator._loadPlugins(["sockjs"]);
    }
  });

  describe('client should connect & publish', function() {
    if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
      var clientMediator = null;
      it('client should connect', function() {
        clientMediator = new MaggaMediator({plugins:['simple','sockjs']});
      });
      it('client should subscribe', function() {
        clientMediator.subscribe('publish', function() {
          console.log('smthg published');
        });
      });
      it('client should publish ', function() {
        clientMediator.publish('publish',{foo:'bar'});
      });
    }
  });
});
