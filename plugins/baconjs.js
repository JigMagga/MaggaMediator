var Bacon = require("baconjs").Bacon;

module.exports = {
    init: function(mediator){
        mediator.bacon = {
            bus: new Bacon.Bus(),
            queue:{}
        };
        mediator.getEventStream = function(queueName){
            var queue;
            // If we don't specify the queue then return Bus with all queues
            if (typeof queueName === 'undefined') {
                return this.bacon.bus;
            }
            else {
                queue = this.bacon.queue[queueName];
            }
            if (typeof queue !== 'undefined') {
                return queue._eventStream;
            }
            // if we don't have such queue then we return ended EventStream
            else {
                return Bacon.never();
            }

        };
    },
    subscribe: function (queueName, cb) {
        var bacon = this.bacon;
        // If we don't have this queue then create it
        if (typeof bacon.queue[queueName] == 'undefined') {
            bacon.queue[queueName] = {
                _eventStream:
                    Bacon.fromEvent(this,'publish',function(eventQueueName,eventValue){
                        // transforming to one object
                        // We need queue to filter it
                        // Then we will take only value
                        return {
                            queue:eventQueueName,
                            value:eventValue
                        };
                    })
                        .filter(function(event){
                            return event.queue === queueName;
                        }).map(".value") //we need only value
                        .name(queueName),
                _unsubscribers: {}

            };
            bacon.bus.plug(bacon.queue[queueName]._eventStream);
        }

        var queue = bacon.queue[queueName];
        // Subscribe cb to the stream and save unsubscribe hook
        queue._unsubscribers[cb] = queue._eventStream.onValue(function(val){
            cb(val);
        });
    },
    unsubscribe: function (queueName, cb) {
        var bacon = this.bacon;
        if (typeof bacon.queue[queueName] === 'undefined') {
            console.warn('Queue is undefined in unsubscribe method');
        }
        else if (typeof bacon.queue[queueName]._unsubscribers[cb] !== 'function') {
            console.warn('cb is undefined in unsubscribe method');
        }
        else {
            // call of unsubscribe function
            this.bacon.queue[queueName]._unsubscribers[cb]();
        }
    }
    // We dont need publish function because we use Bacon.fromEvent(this,'publish'...)
    // to connect directly to the EventEmitter
    //publish: function(queueName, value){}
}