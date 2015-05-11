# MaggaMediator
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

Tests now runs in node and chrome.


