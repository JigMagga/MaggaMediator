"use strict";
var sockjs = require('sockjs');
var _conn = null;
var connections = [];

var init = function (mediator) {
    var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
    echo.on('connection', function(conn) {
        _conn = conn;
        conn.on('data', function(message) {
            var data = JSON.parse(message);
            switch(data.action){
                case 'subscribe' : subscribe();
                    break;
                case 'publish' : publish();
                    break;
            }
            conn.write("foobar");
        });
        conn.on('close', function() {});
    });
    return echo;
};
var subscribe = function (msg) {
    connections.push(_conn);
};
var publish = function (msg) {
    _conn.write("publish");
};

module.exports = function(server) {
    return {
        init: init,
        subscribe:subscribe,
        publish:publish
    }
};
