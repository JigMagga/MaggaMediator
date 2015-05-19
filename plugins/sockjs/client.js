'use strict';

var conn = null;
var mediator = null;
var config = null;

var init = function(MaggaMediator) {
  mediator = MaggaMediator;
  config = mediator.config();
  var path = 'http://'.concat(config.host, ':', config.port, config.path);

  conn = require('sockjs-client');
  conn = new conn(path);

  conn.onopen = function() {
    console.log('open');
  };
  conn.onmessage = function(e) {
    console.log('message', e.data);
  };
  conn.onclose = function() {
    console.log('close');
  };
};

var publish = function() {
  if (config.permission && (config.permission[event] !== 'local' || config.permission[event] !== 'off')) {
    conn.write({event: config.permission[event], data: {data: 'data'}, target: mediator.id});
  }
};

module.exports = {
  init: init,
  publish: publish
};
