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