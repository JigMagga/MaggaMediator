(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
MaggaMediator = (function () {
    console.log("gladitor new instance");
});

MaggaMediator.prototype.connect= function(data,connections){
    var conn = data.type;

    if(typeof window !== 'undefined'){
        //browser
        conn.init({host:data.host,port:data.port,path:data.path},connections);
    }else{
        //server
        return conn.init({host:data.host,port:data.port,path:data.path},connections);
    }
};

module.exports = MaggaMediator;
},{}],2:[function(require,module,exports){
"use strict";

var sock;

var init = function(mediator){
    var path = "http://"+mediator.host+":"+mediator.port+mediator.path;
    sock = new SockJS(path);
    sock.onopen = function() {
        //console.log("sockjs connection is open");
        subscribe();
        //sock.send({action:'subscribe',roomid:'1'});
    };
    sock.onmessage = function(e) {
        console.log('message', e.data);
    };
    console.log(sock);
};
var subscribe = function(){
    sock.send(JSON.stringify({action:'subscribe',roomid:'123'}));
};
var publish= function (msg) {
    sock.send(JSON.stringify({action:'publish',roomid:'123'}));
};

var sockClientPlugin = function(server){
    sock = null;
    return {
        init: init,
        subscribe: subscribe,
        publish: publish,
        unsubscribe: unsubscribe,
        error : error
    }
};

module.exports = sockClientPlugin;
},{}],3:[function(require,module,exports){
"use strict";


var Mediator = require("./../api/MaggaMediator");
var sockjsClientPlugin = require("./../plugins/sockjs")();

console.log(sockjsClientPlugin);

var m = new Mediator();
m.connect({type: sockjsClientPlugin,host: "localhost",port: 8080,path: "/ws"});






/*
=================================================================
 */
function subscribe() {
    console.log("subscribe");
    sockjsClientPlugin.subscribe({event:'subscribe'});
}
function publish() {
    sockjsClientPlugin.publish({event:'publish'});
}

var sub = document.getElementById('subscribe');
sub.addEventListener('click', subscribe);

var pub = document.getElementById('publish');
pub.addEventListener('click', publish);
},{"./../api/MaggaMediator":1,"./../plugins/sockjs":2}]},{},[3]);
