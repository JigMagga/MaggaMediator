/**
 * Plugin API to register a plugin
 * @param  {[type]} pluginDefinition [description]
 * @return {[type]}        [description]
 */
module.exports = function plugin(pluginDefinition) {
  if (typeof pluginDefinition.init === 'function') {
    pluginDefinition.init(this);
  }

  if (typeof pluginDefinition.publish === 'function') {
    this.on('publish', pluginDefinition.publish);
  }

  if (typeof pluginDefinition.subscribe === 'function') {
    this.on('subscribe', pluginDefinition.subscribe);
  }

  if (typeof pluginDefinition.unsubscribe === 'function') {
    this.on('unsubscribe', pluginDefinition.unsubscribe);
  }

  // TODO unsubscribe, error, warning
  // TODO implement event emit in mediator
};

