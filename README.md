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

![Scheme is missing][plugins]
[plugins]: https://github.com/JigMagga/MaggaMediator/blob/master/img/MaggaMediator-plugins.jpg "Basic scheme of communication in MaggaMediator"

### Inner Transport plugins
These plugins provides storage for callbacks from Jigs  
* __simple__  Simple object used to store callbacks in key-value style.
* __baconjs__ For each channel `Bacon.EventStream` would be created. Also, all channels stored as `Bacon.Bus()`

### Outer Transport plugins
Plugins from this set serve as communication transports between MaggaMediators.
* __sockjs__ Sock.js used to organize transportation of events to other Mediators.

### Dispatcher plugins
Plugins that provide additional functionality like permitions or namespaces for events.
* __dispatcherSimple__ Tiny implementation. Only checks and calls.

### Event naming plugins
Dispatchers uses this plugins to resolve particular names of events from recieved patterns of actions. 
* __eventNamesSimple__ Stores structure in nested object (`{foo:{bar:{bal:{},bot:{}},baz:{}}}`). Provides   
  `.find()`   method, that returnes all nodes resolved by pattern. `.find('foo.bar')` will return
  `['foo.bar','foo.bar.bal','foo.bar.bot']`

### ACL plugins
Dispatchers uses this plugins to resolve permitions for particular events. 
* __permissionsSimple__ Stores permissions in as key-values in internal Object.

### Service plugins
* __monitoring__ Provides debugging tools.
* __hooks__ frovides EventEmitter methods `.on()` `.once()` `.off()` `.emit()` to the Mediator.


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
##Examples
###sockjsChat
MaggaMediator allows to create chat application in three simple steps:

_Create a mediator_
```
var MaggaMediator = require('maggaMediator.js');
mediator = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator'
        }
    },
    loadPlugins: ['simple', 'monitoring']
});
```
_Subscribe to channel_
```
mediator.subscribe('chatChannel', function(msg){
    $("#chat").append('<p>' + msg.name + ' wrote: ' + msg.text + '</p>');
});
```
_Instantiate publishing_
```
    msg = {
        name: $("#name").first().val(),
        text: $("#msg").first().val()
    };
    mediator.publish('chatChannel',msg);
```
Enjoy your chat:

<img id="sockjsChat" src="https://github.com/JigMagga/MaggaMediator/blob/master/img/MaggaMediator-sockjsChat.png" width="600">



__Setting up__
To prepare client code for the example go to the folder of the project (e.g `~/repos/MaggaMediator`) and type
```
NODE_PATH=./src ./node_modules/.bin/browserify ./examples/sockjsChat/client/client.js -o ./examples/sockjsChat/client/client.browserified.js
```
To start server part type
```
NODE_PATH="./src/" node ./examples/sockjsChat/server/dummySockJsServer.js
```
then open `./examples/sockjsChat/client/index.html` in several browsers and type messages




 




