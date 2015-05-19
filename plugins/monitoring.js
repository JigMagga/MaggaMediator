// TODO: Functionality for monitoring. In progress.
// with plugins for internal communications maybe we could get rid of it

function Monitor(){
    this._handlers = {};
}

Monitor.prototype._addHandler = function(cb){
    var self = this;
    this._handlers[cb] = function (ev, val) {
        self._callbackQueue(eventName, handler);
    };
};
Monitor.prototype._removeHandler = function(cb){
    delete this._handlers[cb];
};
Monitor.prototype.monitorMethod = undefined;
Monitor.prototype.monitorCallback = [];

// temporary stubs for canjs.map compatibility
// TODO: remove methods after refactor of subscribe etc.
Monitor.prototype.attr = function attr(attribute, value){
    if (typeof attribute !== "string") {
        throw new Error("attribute name must be string");
    }
    if (typeof value ==='undefined') {
        return this[attribute];

    }
    else {
        this[attribute] = value;
    }
};
Monitor.prototype.bind = function(){};
Monitor.prototype.unbind = function(){};
// temporary stubs for canjs.map compatibility

/**
 * Monitor all events or one single event. The vaules get sent to a callback function or are logged to the console
 * @param {function|string} cb - the callback function or the event name
 */
Monitor.prototype.monitor = function (cb) {
    var self = this,
        selfArr;
    if (typeof cb === "string") {
        //self[cb].bind("time", function () {
        //    self._logEvent(cb);
        //});
    } else {
        if (typeof cb === "function") {
            self.monitorCallback.push(cb);
            self.monitorMethod = "_callbackQueue";
        } else {
            self.monitorMethod = "_logEvent";
        }
        selfArr = self.__get();
        for (var eventName in selfArr) {
            if (selfArr.hasOwnProperty(eventName)) {
                //self[eventName].bind("time", function () {
                //    self[self.monitorMethod](eventName, self.monitorCallback);
                //});
            }
        }
    }
};

/**
 * Helper method to bind all eisting monitors to new events
 * @param {string} eventName - the event name
 * @private
 */
Monitor.prototype._addmonitorQueue = function (eventName) {
    var self = this;
    if (self.monitorMethod) {
        //if (self.monitorCallback.length) {
        //    self.monitorCallback.forEach(function(cb) {
        //        self[eventName].bind("time", function () {
        //            self[self.monitorMethod](eventName, cb);
        //        });
        //    });
        //} else {
        //    self[eventName].bind("time", function () {
        //        self[self.monitorMethod](eventName);
        //    });
        //}
    }
};

/**
 * Get all event names
 * @returns {array}
 */
Monitor.prototype.getAllEvents = function () {
    return can.Map.keys(this);
};

/**
 * Writes all event data to the callback funktion
 * @param {string} eventName - the event name
 * @param {function} cb - the callback function
 * @private
 */
Monitor.prototype._callbackQueue = function(eventName, cb) {
    //cb(this.attr(eventName).value, eventName, this.attr(eventName).publisher, this.attr(eventName).time, this.attr(eventName).subscribers.attr());
};

/**
 * Writes all event data to the console
 * @param {string} eventName - the event name
 * @param _cb - not used
 * @private
 */
Monitor.prototype._logEvent = function(eventName, _cb) {
    if (typeof console !== "undefined" && console.log) {
        console.log("JM Mediator - Event:", eventName, ", Value:", this.attr(eventName).value, ", Publisher:", this.attr(eventName).publisher, ", Time:", this.attr(eventName).time, ", Subscribers:", this.attr(eventName).subscribers.attr());
    }
};


module.exports = {
    init: function(mediator){
        mediator.monitor = new Monitor();
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
    subscribe: function (eventName, cb) {
        console.log('Monitor subscribe ',eventName,cb);
        // If we have this event then subscribe
        var self = this.monitor;
        if (typeof self.attr(eventName) !== "undefined") {
            if (typeof cb === "function") {
                self._callbackQueue(eventName, cb);
            }
        } else {
            // create new event
            self._addmonitorQueue(eventName);
        }
        if (typeof cb === "function") {
            self._addHandler(cb);
            //self[eventName].bind("time", self._handlers[cb]);
        }

    },
    unsubscribe: function (eventName, cb) {
        console.log('Monitor unsubscribe ',eventName,cb);
        var self = this.monitor;

        // Remember that _handlers property belongs to the monitor
        if (self._handlers[cb]) {
            self._removeHandler(cb);
        } else {
            throw new Error("No handler found for this cb");
        }

    },
    publish: function(eventName, value){
        console.log('Monitor publish ', eventName,value);
        var self = this.monitor;

        //if (self[eventName] === undefined) {
        //    self.attr(eventName, {"subscribers": []});
        //    self._addmonitorEvent(eventName);
        //}
        //else {
        //    var subscribers = self.attr(eventName).subscribers;
        //    // Check if subscribers is an Array
        //    if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
        //        throw new Error("Subscribers property of event mast be an Array.");
        //    }
        //    // IE: 9+
        //    subscribers.forEach(function(cb/*,ind,arr*/){
        //        if (typeof cb !== "function") {
        //            throw new Error("Subscriber is not a function.");
        //        }
        //        cb.call(self,value);
        //    });
        //
        //}
        //self[eventName].attr("publisher", publisher);

        // TODO: this is how events were exposed. Reimplement
        //self[eventName].attr("value", value);
        //self[eventName].attr("time", new Date());

    }
}