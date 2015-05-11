(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        console.log('amd case');
        // AMD
        define('magga-mediator', [], function() {
            global.MaggaMediator = factory();
            return global.MaggaMediator;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        console.log('module object case');
        // browserify and npm
        module.exports = factory();
    } else {
        // Browser global
        console.log('global case');
        global.MaggaMediator = factory();
    }
    //console.log('maggaMediator this', global, factory)
}(this, function() {
    'use strict';
    var Mediator = require('mediator-js').Mediator;

    function MaggaMediator(configObj){
        Mediator.apply(this,arguments);
        this._config = {};
        this.config(configObj);
    }

    // Inherite MaggaMediator from Mediator
    MaggaMediator.prototype = Object.create(Mediator.prototype);
    MaggaMediator.prototype.constructor = MaggaMediator;

    // Extend MaggaMediator with config function
    // MaggaMediator.config() gives current config, calling with object will update it
    MaggaMediator.prototype.config = function(configObj /* , ...source */) {
        if (arguments.length === 0) {
            return this._config;
        }
        for (var key in configObj) {
            if (Object.prototype.hasOwnProperty.call(configObj, key)) {
                this._config[key] = configObj[key];
            }
        }
        return this._config;
    }

    //console.log('MaggaMediator factory',MaggaMediator);
    return MaggaMediator;
}));

//console.log('maggaMediator this', MaggaMediator)
//module.exports = MaggaMediator;

