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
        if (typeof queueName !== "string") {
            throw new Error("Queue name must be string");
        }

        // If we have this queue then subscribe
        if (typeof self.attr(queueName) !== "undefined") {
            if (typeof cb === "function") {
                self._callbackQueue(queueName, cb);
            }
            self[queueName].subscribers.push(cb);
        } else {
            // create new queue
            self.attr(queueName, {subscribers: [cb]});
            self._addmonitorQueue(queueName);
        }

        if (typeof cb === "function") {
            self._addHandler(cb);
            //self[queueName].bind("time", self._handlers[cb]);
        }
        return self[queueName];
    },
    unsubscribe: function (queueName, cb) {
        var self = this;
        // Remember that _handlers property belongs to the prototype
        if (self._handlers[cb]) {
            self._removeHandler(cb);
            if (typeof this[queueName] !== 'undefined' && typeof this[queueName].subscribers !== 'undefined') {
                // delete cb from subscribers
                var subscribers = this[queueName].subscribers,
                    idxOf = subscribers.indexOf(cb);
                while (idxOf !== -1) {
                    subscribers.splice(idxOf, 1);
                    idxOf = subscribers.indexOf(cb);
                }
            }

        } else {
            throw new Error("No handler found for this cb");
        }

    },
    publish: function(queueName, value){
        var self = this;
        if (typeof queueName !== "string") {
            throw new Error("Queue name must be string");
        }

        if (self[queueName] === undefined) {
            self.attr(queueName, {"subscribers": []});
            self._addmonitorQueue(queueName);
        }
        else {
            var subscribers = self.attr(queueName).subscribers;
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
        //self[queueName].attr("publisher", publisher);

        // TODO: this is how events were exposed. Reimplement
        //self[queueName].attr("value", value);
        //self[queueName].attr("time", new Date());
    }


}