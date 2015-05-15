// TODO: Functionality for monitoring. In progress.
// with plugins for internal communications maybe we could get rid of it

function Monitor(){
    this._handlers = {};
}

Monitor.prototype._addHandler = function(cb){
    var self = this;
    this._handlers[cb] = function (ev, val) {
        self._callbackQueue(queueName, handler);
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
 * Monitor all queues or one single queue. The vaules get sent to a callback function or are logged to the console
 * @param {function|string} cb - the callback function or the queue name
 */
Monitor.prototype.monitor = function (cb) {
    var self = this,
        selfArr;
    if (typeof cb === "string") {
        //self[cb].bind("time", function () {
        //    self._logQueue(cb);
        //});
    } else {
        if (typeof cb === "function") {
            self.monitorCallback.push(cb);
            self.monitorMethod = "_callbackQueue";
        } else {
            self.monitorMethod = "_logQueue";
        }
        selfArr = self.__get();
        for (var queueName in selfArr) {
            if (selfArr.hasOwnProperty(queueName)) {
                //self[queueName].bind("time", function () {
                //    self[self.monitorMethod](queueName, self.monitorCallback);
                //});
            }
        }
    }
};

/**
 * Helper method to bind all eisting monitors to new queues
 * @param {string} queueName - the queue name
 * @private
 */
Monitor.prototype._addmonitorQueue = function (queueName) {
    var self = this;
    if (self.monitorMethod) {
        //if (self.monitorCallback.length) {
        //    self.monitorCallback.forEach(function(cb) {
        //        self[queueName].bind("time", function () {
        //            self[self.monitorMethod](queueName, cb);
        //        });
        //    });
        //} else {
        //    self[queueName].bind("time", function () {
        //        self[self.monitorMethod](queueName);
        //    });
        //}
    }
};

/**
 * Get all queue names
 * @returns {array}
 */
Monitor.prototype.getAllQueues = function () {
    return can.Map.keys(this);
};

/**
 * Writes all queue data to the callback funktion
 * @param {string} queueName - the queue name
 * @param {function} cb - the callback function
 * @private
 */
Monitor.prototype._callbackQueue = function(queueName, cb) {
    //cb(this.attr(queueName).value, queueName, this.attr(queueName).publisher, this.attr(queueName).time, this.attr(queueName).subscribers.attr());
};

/**
 * Writes all queue data to the console
 * @param {string} queueName - the queue name
 * @param _cb - not used
 * @private
 */
Monitor.prototype._logQueue = function(queueName, _cb) {
    if (typeof console !== "undefined" && console.log) {
        console.log("JM Mediator - Queue:", queueName, ", Value:", this.attr(queueName).value, ", Publisher:", this.attr(queueName).publisher, ", Time:", this.attr(queueName).time, ", Subscribers:", this.attr(queueName).subscribers.attr());
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
    subscribe: function (queueName, cb) {
        console.log('subscribe ',queueName,cb,this);
        // If we have this queue then subscribe
        var self = this.monitor;
        if (typeof self.attr(queueName) !== "undefined") {
            if (typeof cb === "function") {
                self._callbackQueue(queueName, cb);
            }
        } else {
            // create new queue
            self._addmonitorQueue(queueName);
        }
        if (typeof cb === "function") {
            self._addHandler(cb);
            //self[queueName].bind("time", self._handlers[cb]);
        }

    },
    unsubscribe: function (queueName, cb) {
        console.log('unsubscribe ',queueName,cb,this);
        var self = this.monitor;

        // Remember that _handlers property belongs to the monitor
        if (self._handlers[cb]) {
            self._removeHandler(cb);
        } else {
            throw new Error("No handler found for this cb");
        }

    },
    publish: function(queueName, value){
        console.log('publish ', queueName,value,this);
        var self = this.monitor;

        //if (self[queueName] === undefined) {
        //    self.attr(queueName, {"subscribers": []});
        //    self._addmonitorQueue(queueName);
        //}
        //else {
        //    var subscribers = self.attr(queueName).subscribers;
        //    // Check if subscribers is an Array
        //    if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
        //        throw new Error("Subscribers property of queue mast be an Array.");
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
        //self[queueName].attr("publisher", publisher);

        // TODO: this is how events were exposed. Reimplement
        //self[queueName].attr("value", value);
        //self[queueName].attr("time", new Date());

    }
}