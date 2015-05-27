var MaggaData = require('maggaData.js');
module.exports = {

    init: function (mediator) {
        if (typeof mediator._innerTransport === 'undefined') {
            mediator._innerTransport = {};
        }
    },
    subscribe: function (eventName, cb) {
        var self = this;
        var transport = this._innerTransport;

        // If we have this event then subscribe
        if (typeof transport[eventName] !== 'undefined') {
            transport[eventName].subscribers.push(cb);
        } else {
            // create new event
            transport[eventName] = {subscribers: [cb]};
            self.emit('addChannel', eventName);
        }
        return transport[eventName];
    },
    unsubscribe: function (eventName, cb) {
        var self = this,
            transport = this._innerTransport,
            subscribers, idxOf;

        if (typeof transport[eventName] !== 'undefined'
            && typeof transport[eventName].subscribers !== 'undefined') {
            // delete cb from subscribers
            subscribers = transport[eventName].subscribers;
            idxOf = subscribers.indexOf(cb);
            while (idxOf !== -1) {
                subscribers.splice(idxOf, 1);
                idxOf = subscribers.indexOf(cb);
            }
            // delete channel if no subscribers
            if (subscribers.length === 0) {
                delete transport[eventName];
                self.emit('deleteChannel', eventName);
            }
        }
    },
    publish: function (eventName, value) {
        var transport = this._innerTransport,
            subscribers;

        if (typeof transport[eventName] === 'undefined') {
//            console.warn("No subscribers for this publish");
//            self[eventName] = {"subscribers": []};
        } else {
            subscribers = transport[eventName].subscribers;
            // Check if subscribers is an Array
            if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
                throw new Error('Subscribers property of event mast be an Array.');
            }
            // IE: 9+
            subscribers.forEach(function (cb) {
                if (typeof cb !== 'function') {
                    throw new Error('Subscriber is not a function.');
                }
                if (value instanceof MaggaData) {
                    cb.call(transport, value.getData());
                }
            });
        }
    }
};
