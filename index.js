var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var sockjs = require('sockjs');

var serve = serveStatic('./public', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
});

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        console.log(message);
    });
    conn.on('close', function() {});
});
echo.installHandlers(server, {prefix:'/ws'});

server.listen(8080);