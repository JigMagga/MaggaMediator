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