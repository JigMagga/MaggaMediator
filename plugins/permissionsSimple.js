var DEFAULT_SIMPLE_PERMISSIONS = {"*":true};

module.exports = {

  init: function(mediator) {

    if (typeof mediator.permissions !== 'undefined') {
      throw Error("The mediator permissions are already exists")
    }

    if (typeof mediator._config.permissions === 'undefined') {
      console.warn("The mediator config for permissions ws not defined");
      mediator._config.permissions = DEFAULT_SIMPLE_PERMISSIONS;
    }

    var self = mediator.permissions = {"_raw":{}};

    self._wild = mediator._config.permissions['*'] || false;

    self.filter = function (eventNameList, action) {
      return eventNameList.filter(function (eventName) {
        return self.getPermission(eventName, action);
      });
    };

    self.getPermission = function (eventName, action) {
      var permissions = self._raw;
      return ( permissions && permissions[eventName] && permissions[eventName][action]) || self._wild;
    };


    /**
     * setPermission used to set permission for the action and
     * @param eventName
     * @param action
     * @param isAllowed
     */
    self.setPermission = function (eventName, action, isAllowed) {
      var permissions = mediator._config.permissions;
      if (permissions && permissions[eventName]) {
        permissions[eventName][action] = isAllowed;
      }
    };

    self._parsePermissions = function (permissions) {
      var isAllowed,permissionsArray,pArrLen;
      if (typeof permissions !== "string") {
        throw Error("Parameter of parsePermissions() must be a string.");
      }
      permissionsArray = permissions.split('.');
      pArrLen = permissionsArray.length;

      // "" will give nothing with permissions
      // "on" should change all actions
      // "off.subscribe,publish" should change only two actions
      switch (pArrLen) {
        case 0:
          return;
        case 1:
          permissionsArray[1] = 'subscribe,unsubscribe,publish';
          break;
      }

      // defining an action
      // do nothing if failed
      switch (permissionsArray[0]) {
        case "on":
          isAllowed = true;
          break;
        case "off":
          isAllowed = false;
          break;
        default:
          return;
      }

      var actionsArr = permissionsArray[1].split(',');

      //// add event name in _raw object if it is not there
      //if (!(eventName in self._raw)) {
      //  self._raw[eventName] = {}
      //}
      // iterate through actions to set up permissions
      return  actionsArr.reduce(function (tmpResult, action){
        tmpResult[action] = isAllowed;
        return tmpResult;
      },{});
    };

    self.requestPermission = function (remoteMediator) {
      // TBD
    };

    if ("eventnames" in mediator._config.permissions) {
      var configPermEventNames = mediator._config.permissions.eventnames;
      for (var key in configPermEventNames) {
        if (Object.prototype.hasOwnProperty.call(configPermEventNames, key)) {
          self._raw[key] = self._parsePermissions(configPermEventNames[key]);
        }
      }

    }




  }
};