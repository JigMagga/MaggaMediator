
module.exports = {
    init: function (mediator) {
        var http, sockjs, config, connConfig, transport;
        http = require('http');
        sockjs = require('sockjs');

        config = mediator.config();
        connConfig = config.plugins.sockjs;

        // Adding wrapping object to the Mediator
        // The structure would be
        // mediator._outerTransport:{echo:sockjsServer, server: httpServer, currentConn: Connection}

        transport = mediator._outerTransport = {};
        // Resulting something like "sockjs-server_613_1432631174226"
        transport.id = 'sockjs-server_'.concat(Math.floor(Math.random() * 1000), '_', +new Date());
        transport.echo = sockjs.createServer(
            {
                sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'
            }
        );
        transport.echo.on('connection', function (sockjsClient) {
            transport.currentConn = sockjsClient;
//            transport.connections.push(transport.currentConn);
            transport.currentConn.on('data', function (message) {
                console.log('some data');
//                transport.currentConn.write(message);
            });
            transport.currentConn.on('close', function () {
            });
        });

        transport.server = http.createServer();
        transport.echo.installHandlers(transport.server, {prefix: connConfig.path});
        transport.server.listen(connConfig.port, connConfig.host);
        console.log('listening on port: ' + connConfig.host + ':' + connConfig.port + ' ');
    },
    publish: function (event, data) {
        var transport = this._outerTransport;
        if (typeof transport.currentConn !== 'undefined') {
            transport.currentConn.write({event: event, data: data, target: transport.id});
        }
    }
};
