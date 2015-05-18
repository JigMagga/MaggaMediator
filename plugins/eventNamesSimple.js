module.exports = {

  init: function(mediator){
    //var sockJsServer = require("sockJsServer");
    //var config = mediator.config();

    // init the sock js listening based on configuration (host, port)
    // sockjs.listen(config.port, config.ip)
    //
    // sockjs.on("open", function(){
    //
    // 	save the connection
    // 	conn.on(data, function(data){
    // 		mediator.emit(data.eventname, data.data);
    // 	})
    //
    // })
    if (typeof mediator.eventNames === 'undefined') {
      mediator.eventNames = {};
    }

    // In this implementation eventNames are just an Array
    mediator.eventNames._eventNames = {};

    // Save the ref for future use
    var _eventNames = mediator.eventNames._eventNames;

    // Implementing add, find, erase operations
    mediator.eventNames.add = function (eventName) {
      _eventNames[eventName] = true;
    };

    mediator.eventNames.find = function (eventName) {
      // we will  return [] or [eventName]
      var result = [];
      if (_eventNames[eventName]) {
        result.push(eventName);
      }
      return result;
    };

    mediator.eventNames.erase = function (eventName) {
      delete _eventNames[eventName];
    };

  }

};