'use strict';

var conn = null;
var mediator = null;
var config = null;

var init = function (MaggaMediator) {
  mediator = MaggaMediator;
  config = mediator.config();
  var connConfig = config.plugins.sockjs;
  var path = 'http://'.concat(connConfig.host, ':', connConfig.port, connConfig.path);

  conn = require('sockjs-client');
  conn = new conn(path);
  conn.onopen = function () {
    console.log('open');
  };
  conn.onmessage = function (e) {
    console.log('message', e.data);
  };
  conn.onclose = function () {
    console.log('close');
  };
};

var publish = function () {
  var permissions = config.plugins.sockjs.permissions;
  if (
    permissions && (
    permissions.publish !== 'local' ||
    permissions.publish !== 'off'
    )) {
    conn.send({event: permissions.publish, data: {data: 'data'}, target: mediator.id});
  }
};

module.exports = {
    init: init,
    publish: publish
};