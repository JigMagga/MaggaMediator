var Bacon = require('baconjs').Bacon,
    Unit = require('../src/unit.js');

module.exports = {
    init: function (mediator) {
        mediator.bacon = {
            bus: new Bacon.Bus(),
            event: {}
        };
        mediator.getEventStream = function (eventName) {
            var event, result;
            // If we don't specify the event then return Bus with all events
            if (typeof eventName === 'undefined') {
                result = this.bacon.bus;
            } else {
                event = this.bacon.event[eventName];
                if (typeof event !== 'undefined') {
                    result = event._eventStream;
                } else {
                    // if we don't have such event then we return ended EventStream
                    result = Bacon.never();
                }
            }
            return result;
        };
    },
    subscribe: function (eventName, cb) {
        var bacon = this.bacon,
            event;
        // If we don't have this event then create it
        if (typeof bacon.event[eventName] === 'undefined') {
            bacon.event[eventName] = {
                _eventStream:
                    Bacon.fromEvent(this, 'publish', function (eventEventName, eventValue) {
                        var result = null;
                        // transforming to one object
                        // We need event to filter it
                        // Then we will take only value
                        if (eventValue instanceof Unit) {
                            result = {
                                event: eventEventName,
                                value: eventValue.getData()
                            }
                        }
                        return result;
                    })
                        .filter(function (e) {
                            return e.event === eventName;
                        }).map('.value')
                        // we need only value
                        .name(eventName),
                _unsubscribers: {}
            };
            bacon.bus.plug(bacon.event[eventName]._eventStream);
        }

        event = bacon.event[eventName];
        // Subscribe cb to the stream and save unsubscribe hook
        event._unsubscribers[cb] = event._eventStream.onValue(function (val) {
            cb(val);
        });
    },
    unsubscribe: function (eventName, cb) {
        var bacon = this.bacon;
        if (typeof bacon.event[eventName] === 'undefined') {
//            console.warn('Event is undefined in unsubscribe method');
        } else if (typeof bacon.event[eventName]._unsubscribers[cb] !== 'function') {
//            console.warn('cb is undefined in unsubscribe method');
        } else {
            // call of unsubscribe function
            this.bacon.event[eventName]._unsubscribers[cb]();
        }
    }
    // We dont need publish function because we use Bacon.fromEvent(this,'publish'...)
    // to connect directly to the EventEmitter
    // publish: function(eventName, value){}
};
