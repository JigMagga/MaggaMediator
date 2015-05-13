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

    var DEFAULT_CONFIG = {
        "internal": ['simple','monitoring']
        //,external: [{"transport":"socks","address":"localhost","port":"99999"}]
    };


    var util = require('util');
    var EventEmitter = require('events').EventEmitter;


    function MaggaMediator(configObj){
        //Mediator.apply(this,arguments);
        this._config = {};
        this.config(configObj || DEFAULT_CONFIG);
        this.init();
    }

    // extend MaggaMediator with EventEmitter
    util.inherits(MaggaMediator, EventEmitter);

    /**
     * Plugin API to register a plugin on the mediator
     * @type {[type]}
     */
    MaggaMediator.prototype.plugin = require("plugin/plugin.js");

    MaggaMediator.prototype.init = function () {
        var self = this;
        var config = self._config;
        var moduleFileName,plugin;
        if (Object.prototype.toString.call(config.internal) !== '[object Array]') {
            throw new Error("config.internal is not an Array.");
        }

        //config.internal.forEach(function(value){
        //    moduleFileName = '../plugins/'+value+'.js';
        //    console.log(moduleFileName);
        //    plugin = require(moduleFileName);
        //    self.plugin(plugin);
        //});
        // now dynamically generated names doesnt work in browserify. Hardcoded for now. But
        // TODO: Implement in a way that works in browserify.
        self.plugin(require('../plugins/simple.js'));
        self.plugin(require('../plugins/monitoring.js'));

    };


    // TODO: Functionality for monitoring. In progress.
    // with plugins for internal communications maybe we could get rid of it
    MaggaMediator.prototype._handlers = {};
    MaggaMediator.prototype._addHandler = function(cb){
        var self = this;
        this._handlers[cb] = function (ev, val) {
            self._callbackQueue(queueName, handler);
        };
    };
    MaggaMediator.prototype._removeHandler = function(cb){
        delete MaggaMediator.prototype._handlers[cb];
    };
    MaggaMediator.prototype.monitorMethod = undefined;
    MaggaMediator.prototype.monitorCallback = [];

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
        this.emit('subscribe',queueName, cb);
    };

    /**
     * Unsubscribe "cb" from a queue
     * @param {string} queueName - the queue name
     * @param {string} cb - the cb
     */
    MaggaMediator.prototype.unsubscribe = function (queueName, cb) {
        this.emit('unsubscribe',queueName, cb);
    };

    /**
     * Publish a value to a queue
     * @param {string} queueName - the queue name
     * @param value - a value of any type
     */
    MaggaMediator.prototype.publish = function (queueName, value) {
        this.emit('publish',queueName, value);
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

    //MaggaMediator.prototype.constructor = MaggaMediator;
    return MaggaMediator;
}));


