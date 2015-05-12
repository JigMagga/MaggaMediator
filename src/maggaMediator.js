(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        console.log('amd case');
        // AMD
        define('magga-mediator', [], function() {
            global.MaggaMediator = factory();
            return global.MaggaMediator;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        console.log('module object case');
        // browserify and npm
        module.exports = factory();
    } else {
        // Browser global
        console.log('global case');
        global.MaggaMediator = factory();
    }
    //console.log('maggaMediator this', global, factory)
}(this, function() {
    'use strict';
    //var Mediator = require('mediator-js').Mediator;

    function MaggaMediator(configObj){
        //Mediator.apply(this,arguments);
        this._config = {};
        this.config(configObj || {});
    }

    MaggaMediator.prototype.constructor = MaggaMediator;
    MaggaMediator.prototype.constructor.handlers = {};
    MaggaMediator.prototype.constructor.monitorMethod = undefined;
    MaggaMediator.prototype.constructor.monitorCallback = [];


    // temporary stubs for canjs.map compatibility
    // TODO: remove methods after refactor of subscribe etc.
    MaggaMediator.prototype.attr = function attr(attribute, value){
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
    MaggaMediator.prototype.bind = function(){};
    MaggaMediator.prototype.unbind = function(){};
    // temporary stubs for canjs.map compatibility

    /**
     * Subscribe "subscriber" to a queue using a callback
     * @param {string} queueName - the queue name
     * @param {function} cb - the callback function
     * @returns {*}
     */
    MaggaMediator.prototype.subscribe = function (queueName, cb) {
        var self = this;
        if (typeof queueName !== "string") {
            throw new Error("Queue name must be string");
        }

        // If we have this queue then subscribe
        if (typeof self.attr(queueName) !== "undefined") {
            if (typeof cb === "function") {
                self._callbackQueue(queueName, cb);
            }
            self[queueName].subscribers.push(cb);
        } else {
            // create new queue
            self.attr(queueName, {subscribers: [cb]});
            self._addmonitorQueue(queueName);
        }

        if (typeof cb === "function") {
            self.constructor.handlers[cb] = function (ev, val) {
                self._callbackQueue(queueName, cb);
            };
            //self[queueName].bind("time", self.constructor.handlers[cb]);
        }
        return self[queueName];
    };

    /**
     * Unsubscribe "cb" from a queue
     * @param {string} queueName - the queue name
     * @param {string} cb - the cb
     */
    MaggaMediator.prototype.unsubscribe = function (queueName, cb) {
        if (this.constructor.handlers[cb] && this[queueName]) {
            //this[queueName].unbind("time", this.constructor.handlers[cb]);
            delete this.constructor.handlers[cb];
        } else if (!this.constructor.handlers[cb]) {
            throw new Error("No handler found for this cb");
        } else {
            delete this.constructor.handlers[cb];
        }
    };

    /**
     * Publish a value to a queue
     * @param {string} queueName - the queue name
     * @param value - a value of any type
     */
    MaggaMediator.prototype.publish = function (queueName, value) {
        var self = this;
        if (typeof queueName !== "string") {
            throw new Error("Queue name must be string");
        }

        if (self[queueName] === undefined) {
            self.attr(queueName, {"subscribers": []});
            self._addmonitorQueue(queueName);
        }
        else {
            // Check if subscribers is an Array
            var subscribers = self.attr(queueName).subscribers;
            if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
                throw new Error("Subscribers property of queue mast be an Array.");
            }
            // IE: 9+
            subscribers.forEach(function(cb/*,ind,arr*/){
                if (typeof cb !== "function") {
                    throw new Error("Subscriber is not a function.");
                }
                cb.call(self,value);
            });

        }
        //self[queueName].attr("publisher", publisher);

        // TODO: this is how events were exposed. Reimplement
        //self[queueName].attr("value", value);
        //self[queueName].attr("time", new Date());
    };

    /**
     * Monitor all queues or one single queue. The vaules get sent to a callback function or are logged to the console
     * @param {function|string} cb - the callback function or the queue name
     */
    MaggaMediator.prototype.monitor = function (cb) {
        var self = this,
            selfArr;
        if (typeof cb === "string") {
            //self[cb].bind("time", function () {
            //    self._logQueue(cb);
            //});
        } else {
            if (typeof cb === "function") {
                self.constructor.monitorCallback.push(cb);
                self.constructor.monitorMethod = "_callbackQueue";
            } else {
                self.constructor.monitorMethod = "_logQueue";
            }
            selfArr = self.__get();
            for (var queueName in selfArr) {
                if (selfArr.hasOwnProperty(queueName)) {
                    //self[queueName].bind("time", function () {
                    //    self[self.constructor.monitorMethod](queueName, self.constructor.monitorCallback);
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
    MaggaMediator.prototype._addmonitorQueue = function (queueName) {
        var self = this;
        if (self.constructor.monitorMethod) {
            //if (self.constructor.monitorCallback.length) {
            //    self.constructor.monitorCallback.forEach(function(cb) {
            //        self[queueName].bind("time", function () {
            //            self[self.constructor.monitorMethod](queueName, cb);
            //        });
            //    });
            //} else {
            //    self[queueName].bind("time", function () {
            //        self[self.constructor.monitorMethod](queueName);
            //    });
            //}
        }
    };

    /**
     * Get all queue names
     * @returns {array}
     */
    MaggaMediator.prototype.getAllQueues = function () {
        return can.Map.keys(this);
    };

    /**
     * Writes all queue data to the callback funktion
     * @param {string} queueName - the queue name
     * @param {function} cb - the callback function
     * @private
     */
    MaggaMediator.prototype._callbackQueue = function(queueName, cb) {
        //cb(this.attr(queueName).value, queueName, this.attr(queueName).publisher, this.attr(queueName).time, this.attr(queueName).subscribers.attr());
    };

    /**
     * Writes all queue data to the console
     * @param {string} queueName - the queue name
     * @param _cb - not used
     * @private
     */
    MaggaMediator.prototype._logQueue = function(queueName, _cb) {
        if (typeof console !== "undefined" && console.log) {
            console.log("JM Mediator - Queue:", queueName, ", Value:", this.attr(queueName).value, ", Publisher:", this.attr(queueName).publisher, ", Time:", this.attr(queueName).time, ", Subscribers:", this.attr(queueName).subscribers.attr());
        }
    };
    /**
     * Extend MaggaMediator with config function.
     * MaggaMediator.config() gives current config, calling with object will update it
     * @param configObj
     * @returns {{}|*}
     */
    MaggaMediator.prototype.config = function(configObj) {
        if (arguments.length === 0) {
            return this._config;
        }
        else {
            if (typeof configObj !== 'object' || !(configObj instanceof Object)) {
                throw new Error("Configuration must be an Object");
            }
            for (var key in configObj) {
                if (Object.prototype.hasOwnProperty.call(configObj, key)) {
                    this._config[key] = configObj[key];
                }
            }
            return this._config;
        }
    }

    //console.log('MaggaMediator factory',MaggaMediator);
    return MaggaMediator;
}));


