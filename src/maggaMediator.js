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

  var DEFAULT_CONFIG = {
    "internal": ['simple', 'monitoring']
    //,external: [{"transport":"socks","address":"localhost","port":"99999"}]
  };


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

  MaggaMediator.prototype.init = function () {
    var self = this;
    var config = self._config;
    if (Object.prototype.toString.call(config.internal) !== '[object Array]') {
      throw new Error("config.internal is not an Array.");
    }

    //config.internal.forEach(function(value){
    //    moduleFileName = '../plugins/'+value+'.js';
    //    console.log(moduleFileName);
    //    plugin = require(moduleFileName);
    //    self.plugin(plugin);
    //});

    // Did this because dynamically generated names doesnt work in browserify.
    // See more https://github.com/substack/node-browserify/issues/377

    config.internal.forEach(function (value) {
      switch (value) {
        case 'simple':
          self.plugin(require('../plugins/simple.js'));
          break;
        case 'monitoring':
          self.plugin(require('../plugins/monitoring.js'));
          break;
        case 'sockjs':
          self.plugin(require('../plugins/sockjs/sockjs.js'));
          break;
        case 'baconjs':
          self.plugin(require('../plugins/baconjs.js'));
          break;
      }
    });

  };


  /**
   * Subscribe "subscriber" to a queue using a callback
   * @param {string} queueName - the queue name
   * @param {function} cb - the callback function
   * @returns {void}
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
   * @returns {void}
   */
  MaggaMediator.prototype.unsubscribe = function (queueName, cb) {
    this.emit('unsubscribe', queueName, cb);
  };

  /**
   * Publish a value to a queue
   * @param {string} queueName - the queue name
   * @param value - a value of any type
   * @returns {void}
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

  //MaggaMediator.prototype.constructor = MaggaMediator;
  return MaggaMediator;
}));

var MaggaMediator = require('maggaMediator');
var maggaMediator = new MaggaMediator();
var sockjs = require('./../plugins/sockjs/sockjs')();
maggaMediator.plugin(sockjs);
