'use strict';

var MaggaMediator = require('maggaMediator.js');

describe('connections', function() {
  it('host should connect', function() {
    if ((typeof (isBrowser) === 'undefined') || !isBrowser) {
      var serverMediator = new MaggaMediator({
        plugins: {
          "sockjs":{
            host: 'localhost',
            port: 8080,
            path: '/mediator',
            permissions:{
              publish: 'on'
            }
          }
        }
      });
    }
  });

  describe('client should connect & publish', function() {
    if ((typeof (isBrowser) !== 'undefined') && isBrowser) {
      var clientMediator;
      it('client should connect', function() {
        //clientMediator = new MaggaMediator({plugins:['simple','sockjs']});
        clientMediator = new MaggaMediator({plugins:['simple']});
      });
      it('client should subscribe', function() {
        clientMediator.subscribe('publish1', function() {
          console.log('smthg published');
        });
      });
      it('client should publish ', function() {
        clientMediator.publish('publish1',{foo:'bar'});
      });
    }
  });
});
