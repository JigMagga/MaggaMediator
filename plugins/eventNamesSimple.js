
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
    mediator.eventNames._eventNames = new MaggaEventNames();

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


function MaggaEventNames(initialObj){
  if (!initialObj) {initialObj = {};}
  this._eventNames = initialObj;
  this.delimiter = '.';
}

MaggaEventNames.prototype.add = function(node){
  node
    .split(this.delimiter)
    .reduce(function(prevReduce,key){
      if (typeof prevReduce[key] === 'undefined'){
        prevReduce[key] = {};
      }
      return prevReduce[key];
    },this._eventNames);


};

MaggaEventNames.prototype.find = function(pattern){
  // Use this function to convert object-style nodes to []-style
  function nameRecursion (prefix, obj) {
    var isVoid = true;
    var result = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj,key)) {
        isVoid = false;
        result = result.concat(nameRecursion(prefix.concat(self.delimiter,key),obj[key]));
      }
    }
    return isVoid? [prefix] : result;
  }
  var self = this;

  // Find node for pattern
  var node = pattern
    .split(this.delimiter)
    .reduce(function(prevReduce,key){
      return (typeof prevReduce[key] === 'undefined')?null:prevReduce[key];
    },this._eventNames);

  // Return empty Array if no node for this pattern
  if (node === null) return [];
  var currentPrefix = pattern;
  return nameRecursion(pattern,node);
};

MaggaEventNames.prototype.delete = function(pattern){

};


var eventNames = new MaggaEventNames();

eventNames.add('foo.oft.bar.baz');
eventNames.add('foo.oft.bar');
eventNames.add('foo.oft.bal.ban');
eventNames.add('foo.oft.bal');
eventNames.add('foo.oft.bal.bak');
eventNames.add('foo.oft.bat');
eventNames.add('foo.oft.bay');


console.log(eventNames._eventNames);

console.log('find result ',eventNames.find('foo.oft'));





