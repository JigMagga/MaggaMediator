'use strict';

/**
 * Plugin API to register a plugin
 * @param  {[type]} plugin [pass a custom plugin]
 */

module.exports = function plugin(plugin) {
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

