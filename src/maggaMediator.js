var simplePlugin = require('../plugins/simple.js'),
    monitoringPlugin = require('../plugins/monitoring.js');

var DEFAULT_CONFIG = {
    plugins: [simplePlugin, monitoringPlugin]
    // ,external: [{"transport":"socks","address":"localhost","port":"99999"}]
    // "plugins.socks: {"address":"localhost","port":"99999"}"
};


var hooks = require('./hooks.js');
var Message = require('./message.js');

function MaggaMediator(configObj) {
    // Mediator.apply(this,arguments);
    this._config = {};
    this.config(configObj || DEFAULT_CONFIG);
    this.init();
}

/**
 * Plugin API to register a plugin on the mediator
 * @type {[type]}
 */
MaggaMediator.prototype.plugin = require('./plugin/plugin.js');
// MaggaMediator.prototype._loadPlugins = require('./plugin/loadPlugins.js');

MaggaMediator.prototype.init = function () {
    var self = this;
    var config = self._config;
    hooks.init(self);
    if (typeof config.plugins !== 'undefined') {
        // self._loadPlugins(config.plugins);
        config.plugins.forEach(function (plugin) {
            self.plugin(plugin);
        });
    }
//    if (typeof config.loadPlugins !== 'undefined') {
//        self._loadPlugins(config.loadPlugins);
//    }
};

MaggaMediator.prototype._dispatchAction = function (action, eventName, data) {
    var self = this;
    if (self._hasDispatcher) {
        self.emit('dispatch', action, eventName, function (resolvedEventName) {
            self.emit(action, resolvedEventName, data);
        });
    } else {
        self.emit(action, eventName, data);
    }
};


/**
 * Subscribe "subscriber" to a event using a callback
 * @param {string} eventName - the event name
 * @param {function} cb - the callback function
 * @returns {void}
 */
MaggaMediator.prototype.subscribe = function (eventName, cb) {
    if (typeof eventName !== 'string') {
        throw new Error('[MaggaMediator.subscribe] event name must be string');
    }
    if (typeof cb !== 'function') {
        throw new Error('[MaggaMediator.subscribe] Second argument must be a function');
    }
    this._dispatchAction('subscribe', eventName, cb);
};

/**
 * Unsubscribe "cb" from a event
 * @param {string} eventName - the event name
 * @param {string} cb - the cb
 * @returns {void}
 */
MaggaMediator.prototype.unsubscribe = function (eventName, cb) {
    if (typeof eventName !== 'string') {
        throw new Error('[MaggaMediator.subscribe] event name must be string');
    }
    if (typeof cb !== 'function') {
        throw new Error('[MaggaMediator.subscribe] Second argument must be a function');
    }

    this._dispatchAction('unsubscribe', eventName, cb);
};

/**
 * Publish a value to a event
 * @param {string} eventName - the event name
 * @param {object} value - a value of any type
 * @returns {void}
 */
MaggaMediator.prototype.publish = function (eventName, value) {
    var self = this,
        data;
    if (typeof eventName !== 'string') {
        throw new Error('Event name must be string');
    }
    if (!(value instanceof Message)) {
        data = new Message(value);
    } else {
        data = value;
    }
    self._dispatchAction('publish', eventName, data);
};

/**
 * Extend MaggaMediator with config function.
 * MaggaMediator.config() gives current config, calling with object will update it
 * @param {object | void} configObj - configuration object
 * @returns {{}|*} will return current configuration of the Mediator
 */
MaggaMediator.prototype.config = function (configObj) {
    var key, result;
    if (arguments.length === 0) {
        result = this._config;
    } else {
        if (typeof configObj !== 'object' || !(configObj instanceof Object)) {
            throw new Error('Configuration must be an Object');
        }
        for (key in configObj) {
            if (Object.prototype.hasOwnProperty.call(configObj, key)) {
                this._config[key] = configObj[key];
            }
        }
        result = this._config;
    }
    return result;
};

module.exports = MaggaMediator;

