module.exports = {
    on: function (eventname, listener) {
        this.on(eventname, listener);
    },
    off: function (eventname, listener) {
        if (typeof listener === 'function') {
            this.removeListener(eventname, listener);
        } else {
            this.removeAllListeners(eventname);
        }
    },
    once: function (eventname, listener) {
        this.once(eventname, listener);
    }
};
