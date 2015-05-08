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
