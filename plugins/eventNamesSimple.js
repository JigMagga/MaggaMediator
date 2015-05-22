
function NestedObjects(initialObj, delimiter, includeNodes) {
    this._nestedKeys = initialObj || {};
    this.delimiter = delimiter || '.';
    this.includeNodes = (typeof includeNodes !== 'undefined') ? includeNodes : true;
}

NestedObjects.prototype.add = function (node) {
    node
        .split(this.delimiter)
        .reduce(function (prevReduce, key) {
            if (typeof prevReduce[key] === 'undefined') {
                prevReduce[key] = {};
            }
            return prevReduce[key];
        }, this._nestedKeys);
};

NestedObjects.prototype.find = function (pattern) {
    var node,
        self = this;
    // Use this function to convert object-style nodes to []-style
    function nameRecursion(prefix, obj) {
        var key,
            returnResult,
            newPrefix,
            isVoid = true,
            result = [];
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                isVoid = false;
                // dont concatenate with void prefix
                newPrefix = prefix !== '' ? prefix.concat(self.delimiter, key) : key;
                // merge arrays by recursion
                result = result.concat(nameRecursion(newPrefix, obj[key]));
            }
        }

        if (self.includeNodes && prefix !== '') {
            returnResult = result.concat([prefix]);
            console.log(returnResult);
            return returnResult;
        }
        else {
            returnResult = isVoid ? [prefix] : result;
            //console.log(returnResult);
            return returnResult;
        }
    }

    // Find node for pattern
    if (typeof pattern !== 'undefined') {
        node = pattern
            .split(this.delimiter)
            .reduce(function (prevReduce, key) {
                if (prevReduce === null) {
                    return null;
                }
                return (typeof prevReduce[key] === 'undefined') ? null : prevReduce[key];
            }, this._nestedKeys);
    }
    else {
        //if we didnt provide any key, then return the whole object
        node = this._nestedKeys;
    }

    // Return empty Array if no node for this pattern
    if (node === null) return [];
    return nameRecursion(pattern || '', node);
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

        mediator.on('addChannel',function(eventName){
            mediator.eventNames.add(eventName);
        });

        mediator.on('deleteChannel',function(eventName){
            mediator.eventNames.delete(eventName);
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







