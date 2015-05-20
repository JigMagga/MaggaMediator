'use strict';

var hooksLogic = {
  subscribe: {
    onHooks : function () {console.log('on subscribe'); },
    offHooks : function () {console.log('off subscribe'); },
    onceHooks : function () {console.log('once subscribe'); }
  },
  publish: {
    onHooks : function () {console.log('on publish'); },
    offHooks : function () {console.log('on publish'); },
    onceHooks : function () {console.log('once publish'); }
  },
  unsubscribe: {
    onHooks : function () {console.log('on unsubscribe'); },
    offHooks : function () {console.log('off unsubscribe'); },
    onceHooks : function () {console.log('once unsubscribe'); }
  }
};

module.exports = function hook(MaggaMediator) {
  ['publish', 'subscribe', 'unsubscribe'].forEach(function (eventName) {
    MaggaMediator.on(eventName, function (data) {
      if (typeof hooksLogic[eventName].onHooks === 'function') {
        hooksLogic[eventName].onHooks(data);
      }
    });
    MaggaMediator.removeListener(eventName, function (data) {
      if (typeof hooksLogic[eventName].offHooks === 'function') {
        hooksLogic[eventName].offHooks(data);
      }
    });
    MaggaMediator.once(eventName, function (data) {
      if (typeof hooksLogic[eventName].onceHooks === 'function') {
        hooksLogic[eventName].onceHooks(data);
      }
    });
  });
};
