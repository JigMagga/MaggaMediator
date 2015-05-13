/**
 * Plugin API to register a plugin 
 * @param  {[type]} plugin [description]
 * @return {[type]}        [description]
 */
module.exports = function plugin(plugin){

	if(typeof plugin.init === "function"){
		plugin.init(this);
	}


	if(typeof plugin.publish === "function"){
		this.on("publish", plugin.publish);
	}


	if(typeof plugin.subscribe === "function"){
		this.on("subscribe", plugin.subscribe);
	}

	// TODO unsubscribe, error, warning
	// TODO implement event emit in mediator


};