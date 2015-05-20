var DEFAULT_CONFIG = {
  "plugins": ['simple','monitoring']
  //,external: [{"transport":"socks","address":"localhost","port":"99999"}]
  // "plugins.socks: {"address":"localhost","port":"99999"}"
};

(function (global, factory) {
  'use strict';
  var consoleMsg;
  if (typeof define === 'function' && define.amd) {
    consoleMsg = 'amd case';

    // AMD
    define('magga-mediator', [], function () {
      global.MaggaMediator = factory();
      return global.MaggaMediator;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    consoleMsg = 'module object case';
    // browserify and npm
    module.exports = factory();
  } else {
    // Browser global
    consoleMsg = 'global case';
    global.MaggaMediator = factory();
  }
  console.log(consoleMsg);
}(this, function () {
  'use strict';
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;


  function MaggaMediator(configObj) {
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
  MaggaMediator.prototype.plugin = require("./plugin/plugin.js");

  MaggaMediator.prototype._loadPlugins = require("./plugin/loadPlugins.js");

  MaggaMediator.prototype.init = function () {
    var self = this;
    var config = self._config;
    if(typeof config.plugins !== 'undefined'){
      self._loadPlugins(config.plugins);
    }
    if(typeof config.loadPlugins !== 'undefined'){
      self._loadPlugins(config.loadPlugins);
    }
  };

  MaggaMediator.prototype._dispatchAction = function (action,eventName,data) {
    var self = this;
    if (EventEmitter.listenerCount(self, 'dispatch')) {
      self.emit('dispatch', action, eventName, function(resolvedEventName){
        self.emit(action, resolvedEventName, data);
      })}
    else{
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
    var eventNames, self;
    if (typeof eventName !== "string") {
      throw new Error("[MaggaMediator.subscribe] event name must be string");
    }
    if (typeof cb !== "function") {
      throw new Error('[MaggaMediator.subscribe] Second argument must be a function');
    }
    this._dispatchAction('subscribe',eventName,cb);
  };

  /**
   * Unsubscribe "cb" from a event
   * @param {string} eventName - the event name
   * @param {string} cb - the cb
   * @returns {void}
   */
  MaggaMediator.prototype.unsubscribe = function (eventName, cb) {
    if (typeof eventName !== "string") {
      throw new Error("[MaggaMediator.subscribe] event name must be string");
    }
    if (typeof cb !== "function") {
      throw new Error('[MaggaMediator.subscribe] Second argument must be a function');
    }

    this._dispatchAction('unsubscribe',eventName,cb);
  };

  /**
   * Publish a value to a event
   * @param {string} eventName - the event name
   * @param value - a value of any type
   * @returns {void}
   */
  MaggaMediator.prototype.publish = function (eventName, value) {
    if (typeof eventName !== "string") {
      throw new Error("Event name must be string");
    }
    var self,eventNames;

    self = this;
    this._dispatchAction('publish',eventName,value);
  };

  /**
   * Extend MaggaMediator with config function.
   * MaggaMediator.config() gives current config, calling with object will update it
   * @param configObj
   * @returns {{}|*}
   */
  MaggaMediator.prototype.config = function (configObj) {
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

  return MaggaMediator;
}));
