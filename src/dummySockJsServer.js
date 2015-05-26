var MaggaMediator = require('./maggaMediator.js');

var dummyServer = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator'
        }
    },
    loadPlugins: ['monitoring']
});

setInterval(function () {
    var msg = 'Dummy message :'.concat(new Date(), ' ,', Math.random());
    dummyServer.publish('dummyChannel', msg);
}, 3000);
