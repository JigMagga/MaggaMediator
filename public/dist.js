(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
MaggaMediator = (function () {
    console.log("gladitor new instance");
});

var c11nType = null;

MaggaMediator.prototype.connect= function(data){
    c11nType = data.c11nType;
    c11nType.init(data);
};

MaggaMediator.prototype.subscribe= function(event){
    c11nType.subscribe(event);
};

MaggaMediator.prototype.publish= function(event){
    c11nType.publish(event);
};

module.exports = MaggaMediator;
},{}],2:[function(require,module,exports){
"use strict";

module.exports = function() {
    var sock = null;
    return {
        init: function (data) {
            var path = data.host+":"+data.port+data.path;
            sock = new SockJS("http://localhost:8080/ws");
            console.log(sock);
            sock.onopen = function() {
                console.log("opened");
                sock.send("foo");
            };
        },
        subscribe: function (msg) {
            console.log(sock);
            sock.send("bhui");
        },
        publish: function (msg) {
            sock.send(JSON.stringify(msg));
        }
    }
};

},{}],3:[function(require,module,exports){
"use strict";

var Mediator = require("./../api/MaggaMediator");
var sockJSpluguin = require("./../plugins/sockjs");
var m = new Mediator();

var s = new sockJSpluguin;

m.connect({c11nType: s,host: "localhost",port: 8080,path: "/ws"});
m.subscribe({event:'subscribe'});
m.publish({event:'publish'});
},{"./../api/MaggaMediator":1,"./../plugins/sockjs":2}]},{},[3]);
