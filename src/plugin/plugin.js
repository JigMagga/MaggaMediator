/**
 * Plugin API to register a plugin
 * @param  {[type]} pluginInstance [description]
 * @return {[type]}        [description]
 */
module.exports = function plugin(pluginInstance) {
  'use strict';

  if (typeof pluginInstance.init === 'function') {
    pluginInstance.init(this);
  }

  if (typeof pluginInstance.publish === 'function') {
    this.on('publish', pluginInstance.publish);
  }

  if (typeof pluginInstance.subscribe === 'function') {
    this.on('subscribe', pluginInstance.subscribe);
  }

  // TODO unsubscribe, error, warning
  // TODO implement event emit in mediator
};
