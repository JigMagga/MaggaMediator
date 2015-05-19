'use strict';

var connections = null;
var currentConn = null;
var mediator = null;
var config = null;

var init = function (MaggaMediator) {
  var http = require('http');
  var sockjs = require('sockjs');
  mediator = MaggaMediator;
  config = mediator.config();
  var connConfig =config.plugins.sockjs;

  var echo = sockjs.createServer(
    {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'}
  );
  echo.on('connection', function (conn) {
    currentConn = conn;
    connections.push(currentConn);
    currentConn.on('data', function (message) {
      console.log('some data');
      currentConn.write(message);
    });
    currentConn.on('close', function () {
    });
  });

  var server = http.createServer();
  echo.installHandlers(server, {prefix: connConfig.path});
  server.listen(connConfig.port, connConfig.host);
  console.log('listening on port: ' + connConfig.host + ':' + connConfig.port + ' ');
};

var publish = function (event, data) {
  var permissions = config.plugins.sockjs.permissions;
  if (
    permissions && (
    permissions.publish !== 'local' ||
    permissions.publish !== 'off'
    )) {
    currentConn.write({event: event, data: data, target: mediator.id});
  }
};

module.exports = {
    init: init,
    publish: publish
};
