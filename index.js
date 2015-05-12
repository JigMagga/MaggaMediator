var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var sockjs = require('sockjs');

var Mediator = require("./api/MaggaMediator");

var sockjsServerPlugin = new require("./plugins/sockjs-server")();
var serve = serveStatic('./public', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
});

var m = new Mediator();
var echo = m.connect({type: sockjsServerPlugin,host: "localhost",port: 8080,path: "/ws"});
echo.installHandlers(server, {prefix:'/ws'});

server.listen(8080);