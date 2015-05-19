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
      var clientMediator = new MaggaMediator({plugins:['simple','sockjs']});
      it('client should connect', function() {
        //clientMediator.plugin(sockjsClient);
      });
      it('client should publish ', function() {
        console.log("one step before publish");
        clientMediator.publish('publish',{foo:'bar'});
      });
    }
  });
});
