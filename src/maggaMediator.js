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

  };


  /**
   * Subscribe "subscriber" to a queue using a callback
   * @param {string} queueName - the queue name
   * @param {function} cb - the callback function
   * @returns {*}
   */
  MaggaMediator.prototype.subscribe = function (queueName, cb) {
    if (typeof queueName !== "string") {
      throw new Error("[MaggaMediator.subscribe] Queue name must be string");
    }
    if (typeof cb !== "function") {
      throw new Error('[MaggaMediator.subscribe] Second argument must be a function');

    }
    this.emit('subscribe', queueName, cb);
  };

  /**
   * Unsubscribe "cb" from a queue
   * @param {string} queueName - the queue name
   * @param {string} cb - the cb
   */
  MaggaMediator.prototype.unsubscribe = function (queueName, cb) {
    this.emit('unsubscribe', queueName, cb);
  };

  /**
   * Publish a value to a queue
   * @param {string} queueName - the queue name
   * @param value - a value of any type
   */
  MaggaMediator.prototype.publish = function (queueName, value) {
    if (typeof queueName !== "string") {
      throw new Error("Queue name must be string");
    }
    this.emit('publish', queueName, value);
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

//var MaggaMediator = require('maggaMediator');
//var maggaMediator = new MaggaMediator();
//var sockjs = require('./../plugins/sockjs/sockjs')();
//maggaMediator.plugin(sockjs);
