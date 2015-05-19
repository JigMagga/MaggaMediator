'use strict';

var connections = null;
var currentConn = null;
var mediator = null;
var config = null;

var init = function(MaggaMediator) {
  var http = require('http');
  var sockjs = require('sockjs');
  mediator = MaggaMediator;
  config = mediator.config();

  var echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'});
  echo.on('connection', function(conn) {
    currentConn = conn;
    connections.push(currentConn);
    currentConn.on('data', function(message) {
      currentConn.write(message);
    });
    currentConn.on('close', function() {
    });
  });

  var server = http.createServer();
  echo.installHandlers(server, {prefix: config.path});
  server.listen(config.port, config.host);
  console.log('listening on port: ' + config.host + ':' + config.port + ' ');
};

var publish = function(event, data) {
  if (config.permission && (config.permission[event] !== 'local' || config.permission[event] !== 'off')) {
    currentConn.write({event: event, data: data, target: mediator.id});
  }
};

module.exports = {
  init: init,
  publish: publish
};
