"use strict";

var Mediator = require("./../api/MaggaMediator");
var sockJSpluguin = require("./../plugins/sockjs");
var m = new Mediator();

var s = new sockJSpluguin;

m.connect({c11nType: s,host: "localhost",port: 8080,path: "/ws"});
m.subscribe({event:'subscribe'});
m.publish({event:'publish'});