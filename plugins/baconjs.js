var Bacon = require("baconjs").Bacon;

module.exports = {
    init: function(mediator){
        mediator.bacon = {
            bus: new Bacon.Bus(),
            event:{}
        };
        mediator.getEventStream = function(eventName){
            var event;
            // If we don't specify the event then return Bus with all events
            if (typeof eventName === 'undefined') {
                return this.bacon.bus;
            }
            else {
                event = this.bacon.event[eventName];
            }
            if (typeof event !== 'undefined') {
                return event._eventStream;
            }
            // if we don't have such event then we return ended EventStream
            else {
                return Bacon.never();
            }

        };
    },
    subscribe: function (eventName, cb) {
        var bacon = this.bacon;
        // If we don't have this event then create it
        if (typeof bacon.event[eventName] == 'undefined') {
            bacon.event[eventName] = {
                _eventStream:
                    Bacon.fromEvent(this,'publish',function(eventEventName,eventValue){
                        // transforming to one object
                        // We need event to filter it
                        // Then we will take only value
                        return {
                            event:eventEventName,
                            value:eventValue
                        };
                    })
                        .filter(function(event){
                            return event.event === eventName;
                        }).map(".value") //we need only value
                        .name(eventName),
                _unsubscribers: {}

            };
            bacon.bus.plug(bacon.event[eventName]._eventStream);
        }

        var event = bacon.event[eventName];
        // Subscribe cb to the stream and save unsubscribe hook
        event._unsubscribers[cb] = event._eventStream.onValue(function(val){
            cb(val);
        });
    },
    unsubscribe: function (eventName, cb) {
        var bacon = this.bacon;
        if (typeof bacon.event[eventName] === 'undefined') {
            console.warn('Event is undefined in unsubscribe method');
        }
        else if (typeof bacon.event[eventName]._unsubscribers[cb] !== 'function') {
            console.warn('cb is undefined in unsubscribe method');
        }
        else {
            // call of unsubscribe function
            this.bacon.event[eventName]._unsubscribers[cb]();
        }
    }
    // We dont need publish function because we use Bacon.fromEvent(this,'publish'...)
    // to connect directly to the EventEmitter
    //publish: function(eventName, value){}
}