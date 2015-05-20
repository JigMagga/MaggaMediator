module.exports = {

  init: function (mediator) {
    mediator.on('dispatch', function (action, eventName, cb) {
      var resolvedEventNames, eventNames;
      console.log('dispatch ', action,' for ', eventName);

      // If we have a system of eventNames location then we use it.
      // Otherwise we just wrap the name into the Array
      if (typeof mediator.eventNames !== 'undefined') {
        eventNames = mediator.eventNames.find(eventName);
      }
      else eventNames = [eventName];

      // If we have a system of permissions then we use it.
      if (typeof mediator.permissions !== 'undefined') {
        resolvedEventNames = mediator.permissions.filter(eventNames,action);
      }
      else {
        resolvedEventNames = eventNames;
      }

      resolvedEventNames.forEach(function(resolvedEventName){
        cb.call(mediator,resolvedEventName);
      });

    });
  }
};