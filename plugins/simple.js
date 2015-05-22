module.exports = {

    init: function(mediator){
        if (typeof mediator["_innerTransport"] === 'undefined') {
            mediator["_innerTransport"] = {};
        }
    },
    subscribe: function (eventName, cb) {
        var mediator = this;
        var self = this._innerTransport;

        // If we have this event then subscribe
        if (typeof self[eventName] !== "undefined") {
            self[eventName].subscribers.push(cb);
        } else {
            // create new event
            self[eventName] =  {subscribers: [cb]};
            mediator.emit('addChannel',eventName);
        }
        return self[eventName];
    },
    unsubscribe: function (eventName, cb) {
        var mediator = this;
        var self = this._innerTransport;

        if (typeof self[eventName] !== 'undefined' && typeof self[eventName].subscribers !== 'undefined') {
            // delete cb from subscribers
            var subscribers = self[eventName].subscribers,
                idxOf = subscribers.indexOf(cb);
            while (idxOf !== -1) {
                subscribers.splice(idxOf, 1);
                idxOf = subscribers.indexOf(cb);
            }
            // delete channel if no subscribers
            if (subscribers.length === 0) {
                delete self[eventName];
                mediator.emit('deleteChannel',eventName);
            }
        }
    },
    publish: function(eventName, value){
        var self = this._innerTransport;

        if (self[eventName] === undefined) {
            console.warn("No subscribers for this publish");
            //self[eventName] = {"subscribers": []};
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

};