var MaggaMediator = require('./../../../src/maggaMediator.js');

var dummyServer = new MaggaMediator({
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


setInterval(function () {
    var msg = 'Dummy message :'.concat(new Date(), ' ,', Math.random());
    dummyServer.publish('dummyChannel', msg);
}, 30000);
