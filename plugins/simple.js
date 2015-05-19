module.exports = {

    init: function(mediator){
        //var sockJsServer = require("sockJsServer");
        //var config = mediator.config();

        // init the sock js listening based on configuration (host, port)
        // sockjs.listen(config.port, config.ip)
        //
        // sockjs.on("open", function(){
        //
        // 	save the connection
        // 	conn.on(data, function(data){
        // 		mediator.emit(data.eventname, data.data);
        // 	})
        //
        // })
    },
    subscribe: function (eventName, cb) {
        var self = this;

        // If we have this event then subscribe
        if (typeof self[eventName] !== "undefined") {
            self[eventName].subscribers.push(cb);
        } else {
            // create new event
            self[eventName] =  {subscribers: [cb]};
        }
        return self[eventName];
    },
    unsubscribe: function (eventName, cb) {
        var self = this;

        if (typeof self[eventName] !== 'undefined' && typeof self[eventName].subscribers !== 'undefined') {
            // delete cb from subscribers
            var subscribers = self[eventName].subscribers,
                idxOf = subscribers.indexOf(cb);
            while (idxOf !== -1) {
                subscribers.splice(idxOf, 1);
                idxOf = subscribers.indexOf(cb);
            }
        }


    },
    publish: function(eventName, value){
        var self = this;

        if (self[eventName] === undefined) {
            self[eventName] = {"subscribers": []};
        }
        else {
            var subscribers = self[eventName].subscribers;
            // Check if subscribers is an Array
            if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
                throw new Error("Subscribers property of event mast be an Array.");
            }
            // IE: 9+
            subscribers.forEach(function(cb/*,ind,arr*/){
                if (typeof cb !== "function") {
                    throw new Error("Subscriber is not a function.");
                }
                cb.call(self,value);
            });

        }
    }


}