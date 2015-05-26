// TODO: Functionality for monitoring. In progress.
// for monitoring inspiration take a look at
// https://github.com/yourdelivery/JigMagga/blob/
// 922709fe80635d5180160bbac6271ea86bd029cf/core/mediator/mediator.js
// with plugins for internal communications maybe we could get rid of it
module.exports = {
    init: function () {
    },
    subscribe: function (eventName, cb) {
        console.log('Monitor subscribe ', eventName, cb);  // If we have this event then subscribe
    },
    unsubscribe: function (eventName, cb) {
        console.log('Monitor unsubscribe ', eventName, cb);
    },
    publish: function (eventName, value) {
        console.log('Monitor publish ', eventName, value);
    }
};