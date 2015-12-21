///**
// * loads a plugin from the provised list of names
// * use it like Mediator.load(['simple','monitoring'])
// * @param {Array | String} plugins - List of plugins to load
// * @returns {void}
// */
//module.exports = function loadPlugins(plugins) {
//    var self = this,
//        pluginList = [],
//        key;
//    if (Object.prototype.toString.call(plugins) === '[object Array]') {
//        pluginList = plugins;
//    } else if (Object.prototype.toString.call(plugins) === '[object Object]') {
//        for (key in plugins) {
//            if (plugins.hasOwnProperty(key)) {
//                pluginList.push(key);
//            }
//        }
//    } else {
//        throw Error('Type of plugins must be Array or object');
//    }
//
//    // Did this because dynamically generated names doesnt work in browserify.
//    // See more https://github.com/substack/node-browserify/issues/377
//    pluginList.forEach(function (value) {
//
//        switch (value) {
//            case 'simple':
//                self.plugin(require('../../plugins/simple.js'));
//                break;
//            case 'monitoring':
//                self.plugin(require('../../plugins/monitoring.js'));
//                break;
//            case 'sockjs':
//                self.plugin(require('../../plugins/sockjs/sockjs.js')());
//                break;
//            case 'baconjs':
//                self.plugin(require('../../plugins/baconjs.js'));
//                break;
//            case 'eventNamesSimple':
//                self.plugin(require('../../plugins/eventNamesSimple.js'));
//                break;
//            case 'permissionsSimple':
//                self.plugin(require('../../plugins/permissionsSimple.js'));
//                break;
//            case 'dispatcherSimple':
//                self.plugin(require('../../plugins/dispatcherSimple.js'));
//                break;
//
//            default:
//                throw Error('No plugin for ' + value + ' found');
//        }
//    });
//};
