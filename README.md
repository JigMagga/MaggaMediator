# MaggaMediator [![Build Status](https://travis-ci.org/JigMagga/MaggaMediator.svg?branch=master)](https://travis-ci.org/JigMagga/MaggaMediator)
The MaggaMediator is the heart of JigMagga. Its job is to provide an communication layer.

## Usage

Install module to your project
```
npm install JigMagga/MaggaMediator --save
```

Then in your code use in like

```
var MaggaMediator = require('MaggaMediator');
mediator = new MaggaMediator();
```

## Tests

Testem + Mocha + Chai are used for testing. Put your tests in `test/<NAMESPACE>` folder with `*.test.js` extension. To run tests use

```
npm test
```
By default tests run in node and chrome.

##Plugins
We want to keep the spirit of loosly coupled. We divided Mediator in different parts and implemented its functionality by plugins. 

### Inner Transport plugins
These plugins provides storage for callbacks from Jigs  
* __simple__
* __baconjs__

### Outer Transport plugins
Plugins from this set serve as communication transports between MaggaMediators.
* __sockjs__

### Dispatcher plugins
Plugins that provide additional functionality like permitions or namespaces for events.
* __dispatcherSimple__
### Event naming plugins
Dispatchers uses this plugins to resolve particular names of events from recieved patterns of actions. 
* __eventNamesSimple__
### ACL plugins
Dispatchers uses this plugins to resolve permitions for particular events. 
* __permissionsSimple__
### Service plugins
* __monitoring__ Provides debugging tools.
* __hooks__ frovides EventEmitter methods .on() .once() .off() .emit() to the Mediator.


##Configuration

MaggaMediators are configuration driving objects. This section explains some points about config conventions. 
We were inspired by Grunt style of describing it. So, for the configuration you enumerate your plugins with options using 
plugin names as keys. 

Example:

```
      var someSockMediator = new MaggaMediator({
        plugins: {
          "sockjs":{
            host: 'localhost',
            port: 8080,
            path: '/mediator',
            permissions:{
              publish: 'on'
            }
          },
          "anotherPlugin":{
            foo: 'bar',
            baz: 1
          }
        }
      });
```

Alternatively, if your plugins doesn't need any options, you can enumerate them in array:
```
var someSockMediator = new MaggaMediator({plugins:['simple','monitoring']});
```




 




