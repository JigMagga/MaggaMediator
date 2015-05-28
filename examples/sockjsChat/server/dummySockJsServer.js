// Adding path to maggaMediator to resolve it
module.paths.push('./src');

var MaggaMediator = require('maggaMediator'),
    express = require('express'),
    app = express(),
    dummyServer;


dummyServer = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator',
            sockjsUrl: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'
        }
    },
    loadPlugins: ['monitoring']
});

app.use(express.static(__dirname + '/../client'));
app.listen(3000);
console.log('Client is listening on port 3000');

// Setting some dummy data channel for demo and debug needs
setInterval(function () {
    var msg = 'Dummy message :'.concat(new Date(), ' ,', Math.random());
    dummyServer.publish('dummyChannel', msg);
}, 30000);
