var _mediator = null;
var _config = null;
var _conn = null;

var init = function (mediator) {
  var http = require('http');
  var sockjs = require('sockjs');
  _mediator = mediator;
  _config = mediator.config();

  var echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'});
  echo.on('connection', function (conn) {
    _conn = conn;
    connections.push(conn);
    conn.on('data', function (message) {
      conn.write(message);
    });
    conn.on('close', function () {
    });
  });

  var server = http.createServer();
  echo.installHandlers(server, {prefix: '/echo'});
  server.listen(_config.port, _config.ip);
};

var publish = function (event, data) {
  var dontPublishWhen = ["local", "off"];
  if (dontPublishWhen.indexOf(_config.permission) > -1) {
    _conn.write({event: event, data: data, target: mediator.id});

  }

};

module.exports = {
  init: init,
  publish: publish
}