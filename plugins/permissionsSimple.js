var DEFAULT_SIMPLE_PERMISSIONS = {'*': true};

module.exports = {

    init: function (mediator) {
        var permissions,
            configPermEventNames,
            key;
        if (typeof mediator.permissions !== 'undefined') {
            throw Error('The mediator permissions are already exists');
        }

        if (typeof mediator._config.permissions === 'undefined') {
            // console.warn("The mediator config for permissions was not defined");
            mediator._config.permissions = DEFAULT_SIMPLE_PERMISSIONS;
        }

        permissions = mediator.permissions = {_raw: {}};

        permissions._wild = mediator._config.permissions['*'] || false;

        permissions.filter = function (eventNameList, action) {
            return eventNameList.filter(function (eventName) {
                return permissions.getPermission(eventName, action);
            });
        };

        permissions.getPermission = function (eventName, action) {
            var raw = permissions._raw;
            return (raw && raw[eventName] && raw[eventName][action]) || raw._wild;
        };

        permissions.setPermission = function (eventName, action, isAllowed) {
            var config = mediator._config.permissions;
            if (config && config[eventName]) {
                config[eventName][action] = isAllowed;
            }
        };

        permissions._parsePermissions = function (permissionsString) {
            var isAllowed,
                permissionsArray,
                pArrLen,
                actionsArr;
            if (typeof permissionsString !== 'string') {
                throw Error('Parameter of parsePermissions() must be a string.');
            }
            permissionsArray = permissionsString.split('.');
            pArrLen = permissionsArray.length;

            // "" will give nothing with permissions
            // "on" should change all actions
            // "off.subscribe,publish" should change only two actions
            switch (pArrLen) {
                case 0:
                    return null;
                case 1:
                    permissionsArray[1] = 'subscribe,unsubscribe,publish';
                    break;
                default :
            }

            // defining an action
            // do nothing if failed
            switch (permissionsArray[0]) {
                case 'on':
                    isAllowed = true;
                    break;
                case 'off':
                    isAllowed = false;
                    break;
                default:
                    return null;
            }

            actionsArr = permissionsArray[1].split(',');
            // iterate through actions to set up permissions
            return actionsArr.reduce(function (tmpResult, action) {
                tmpResult[action] = isAllowed;
                return tmpResult;
            }, {});
        };

        permissions.requestPermission = function (remoteMediator) {
            // TBD
            return remoteMediator;
        };

        if ('eventnames' in mediator._config.permissions) {
            configPermEventNames = mediator._config.permissions.eventnames;
            for (key in configPermEventNames) {
                if (Object.prototype.hasOwnProperty.call(configPermEventNames, key)) {
                    permissions._raw[key] = permissions.
                        _parsePermissions(configPermEventNames[key]);
                }
            }
        }
    }
};
