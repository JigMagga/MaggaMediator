(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jmM"] = factory();
	else
		root["jmM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var simplePlugin = __webpack_require__(1),
	    monitoringPlugin = __webpack_require__(1);
	
	var DEFAULT_CONFIG = {
	    plugins: [simplePlugin, monitoringPlugin]
	    // ,external: [{"transport":"socks","address":"localhost","port":"99999"}]
	    // "plugins.socks: {"address":"localhost","port":"99999"}"
	};
	
	
	var hooks = __webpack_require__(3);
	var Message = __webpack_require__(2);
	
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
	MaggaMediator.prototype.plugin = __webpack_require__(5);
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
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Message = __webpack_require__(2);
	module.exports = {
	
	    init: function (mediator) {
	        if (typeof mediator._innerTransport === 'undefined') {
	            mediator._innerTransport = {};
	        }
	    },
	    subscribe: function (eventName, cb) {
	        var self = this;
	        var transport = this._innerTransport;
	
	        // If we have this event then subscribe
	        if (typeof transport[eventName] !== 'undefined') {
	            transport[eventName].subscribers.push(cb);
	        } else {
	            // create new event
	            transport[eventName] = {subscribers: [cb]};
	            self.emit('addChannel', eventName);
	        }
	        return transport[eventName];
	    },
	    unsubscribe: function (eventName, cb) {
	        var self = this,
	            transport = this._innerTransport,
	            subscribers, idxOf;
	
	        if (typeof transport[eventName] !== 'undefined'
	            && typeof transport[eventName].subscribers !== 'undefined') {
	            // delete cb from subscribers
	            subscribers = transport[eventName].subscribers;
	            idxOf = subscribers.indexOf(cb);
	            while (idxOf !== -1) {
	                subscribers.splice(idxOf, 1);
	                idxOf = subscribers.indexOf(cb);
	            }
	            // delete channel if no subscribers
	            if (subscribers.length === 0) {
	                delete transport[eventName];
	                self.emit('deleteChannel', eventName);
	            }
	        }
	    },
	    publish: function (eventName, value) {
	        var transport = this._innerTransport,
	            subscribers;
	
	        if (typeof transport[eventName] === 'undefined') {
	//            console.warn("No subscribers for this publish");
	//            self[eventName] = {"subscribers": []};
	        } else {
	            subscribers = transport[eventName].subscribers;
	            // Check if subscribers is an Array
	            if (Object.prototype.toString.call(subscribers) !== '[object Array]') {
	                throw new Error('Subscribers property of event mast be an Array.');
	            }
	            // IE: 9+
	            subscribers.forEach(function (cb) {
	                if (typeof cb !== 'function') {
	                    throw new Error('Subscriber is not a function.');
	                }
	                if (value instanceof Message) {
	                    cb.call(transport, value.getData());
	                }
	            });
	        }
	    }
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	// TODO Implement Message data envelope in a right way
	
	function Message(data) {
	    // We use _md = 1 in data to understand i
	    if (typeof data === 'object' && data._u === 1) {
	        this._data = data._data;
	        this._context = data._context;
	    } else {
	        this._data = data;
	        this._context = {};
	    }
	    this._u = 1;
	}
	
	Message.prototype.getData = function () {
	    return this._data;
	};
	
	Message.prototype.getContext = function (contextKey) {
	    return this._context[contextKey];
	};
	
	Message.prototype.setContext = function (contextKey, value) {
	    this._context[contextKey] = value;
	};
	
	module.exports = Message;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(4).EventEmitter;
	
	module.exports = {
	    init: function (mediator) {
	        mediator._eventEmitter = new EventEmitter();
	        mediator.on = mediator._eventEmitter.on;
	        mediator.off = mediator._eventEmitter.removeListener;
	        mediator.once = mediator._eventEmitter.once;
	        mediator.emit = mediator._eventEmitter.emit;
	    }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Plugin API to register a plugin
	 * @param  {[type]} plugin [pass a custom plugin]
	 * @returns {void}
	 */
	module.exports = function (plugin) {
	    if (typeof plugin.init === 'function') {
	        plugin.init(this);
	    }
	
	    if (typeof plugin.publish === 'function') {
	        this.on('publish', plugin.publish);
	    }
	
	    if (typeof plugin.subscribe === 'function') {
	        this.on('subscribe', plugin.subscribe);
	    }
	
	    if (typeof plugin.unsubscribe === 'function') {
	        this.on('unsubscribe', plugin.unsubscribe);
	    }
	
	    if (typeof plugin.error === 'function') {
	        this.on('error', plugin.error);
	    }
	
	    if (typeof plugin.warning === 'function') {
	        this.on('warning', plugin.warning);
	    }
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=maggaMediator.js.map