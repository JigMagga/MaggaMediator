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
    subscribe: function (queueName, cb) {
        var self = this;

        // If we have this queue then subscribe
        if (typeof self[queueName] !== "undefined") {
            self[queueName].subscribers.push(cb);
        } else {
            // create new queue
            self[queueName] =  {subscribers: [cb]};
        }
        return self[queueName];
    },
    unsubscribe: function (queueName, cb) {
        var self = this;

        if (typeof self[queueName] !== 'undefined' && typeof self[queueName].subscribers !== 'undefined') {
            // delete cb from subscribers
            var subscribers = self[queueName].subscribers,
                idxOf = subscribers.indexOf(cb);
            while (idxOf !== -1) {
                subscribers.splice(idxOf, 1);
                idxOf = subscribers.indexOf(cb);
            }
        }


    },
    publish: function(queueName, value){
        var self = this;

        if (self[queueName] === undefined) {
            self[queueName] = {"subscribers": []};
        }
        else {
            var subscribers = self[queueName].subscribers;
            // Check if subscribers is an Array
            if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
                throw new Error("Subscribers property of queue mast be an Array.");
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