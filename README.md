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
TBD

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




 




