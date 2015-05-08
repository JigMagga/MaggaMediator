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

QUnit is used for testing. Put your tests in `tests/tests.js`  Use browserify to create test file.

```
browserify tests/tests.js -o maggaMediator.tests.js
```

Then open tests/tests.html file in your browser



