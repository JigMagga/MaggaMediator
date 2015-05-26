var EventEmitter = require('events').EventEmitter;

module.exports = {
    init: function (mediator) {
        mediator._eventEmitter = new EventEmitter();
        mediator.on = mediator._eventEmitter.on;
        mediator.off = mediator._eventEmitter.removeListener;
        mediator.once = mediator._eventEmitter.once;
        mediator.emit = mediator._eventEmitter.emit;
    }
};
