
function NestedObjects(initialObj,delimiter){
  this._nestedKeys = initialObj || {};
  this.delimiter = delimiter || '.';
}

NestedObjects.prototype.add = function(node){
  node
    .split(this.delimiter)
    .reduce(function(prevReduce,key){
      if (typeof prevReduce[key] === 'undefined'){
        prevReduce[key] = {};
      }
      return prevReduce[key];
    },this._nestedKeys);

};

NestedObjects.prototype.find = function(pattern){
  // Use this function to convert object-style nodes to []-style
  function nameRecursion (prefix, obj) {
    var isVoid = true;
    var result = [];
    var newPrefix;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj,key)) {
        isVoid = false;
        // dont concatenate with void prefix
        newPrefix = prefix !== "" ? prefix.concat(self.delimiter,key) : key;
        // merge arrays by recursion
        result = result.concat(nameRecursion(newPrefix,obj[key]));
      }
    }
    return isVoid? [prefix] : result;
  }
  var self = this;
  var node;

  // Find node for pattern
  if (pattern !== undefined) {
    node = pattern
      .split(this.delimiter)
      .reduce(function(prevReduce,key){
        if(prevReduce === null) return null;
        return (typeof prevReduce[key] === 'undefined')?null:prevReduce[key];
      },this._nestedKeys);
  }
  else {
    //if we didnt provide any key, then return the whole object
    node = this._nestedKeys;
  }

  // Return empty Array if no node for this pattern
  if (node === null) return [];
  return nameRecursion(pattern || '',node);
};

NestedObjects.prototype.delete = function(pattern){
  var deletingNode = pattern.split(this.delimiter);
  // pop the last key to use it in delete
  var deletingKey = deletingNode.pop();
  //converting in node reference
  deletingNode = deletingNode
    .reduce(function(prevReduce,key){
      if (typeof prevReduce[key] === 'undefined'){
        return undefined;
      }
      return prevReduce[key];
    },this._nestedKeys);

  if (typeof deletingNode !== "undefined") {
    delete deletingNode[deletingKey];
  }
};


module.exports = {

  init: function(mediator){

    if (typeof mediator.eventNames === 'undefined') {
      mediator.eventNames = new NestedObjects();
    }

    mediator.on('subscribe',function(eventName){
      mediator.eventNames.add(eventName);
    });

  //  // In this implementation eventNames are just an Array
  //  mediator.eventNames = new NestedObjects();
  //
  //  // Save the ref for future use
  //  var _eventNames = mediator.eventNames._nestedKeys;
  //
  //  // Implementing add, find, erase operations
  //  mediator.eventNames.add = function (eventName) {
  //
  //    _eventNames.add(eventName);
  //  };
  //
  //  mediator.eventNames.find = _eventNames.find;
  //
  //  mediator.eventNames.erase = _eventNames.delete;
  }

};
//







