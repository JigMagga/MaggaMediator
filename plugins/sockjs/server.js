
module.exports = {
    init: function (mediator) {
        var http, sockjs, config, connConfig, transport;
        http = require('http');
        sockjs = require('sockjs');

        config = mediator.config();
        connConfig = config.plugins.sockjs;

        // Adding wrapping object to the Mediator
        // The structure would be
        // mediator._outerTransport:{
        //      echo:sockjsServer,
        //      server: httpServer,
        //      connections: array of Connection
        // }
        transport = mediator._outerTransport = {connections:[]};
        // Resulting something like "sockjs-server_613_1432631174226"
        transport.id = 'sockjs-server_'.concat(Math.floor(Math.random() * 1000), '_', +new Date());
        transport.echo = sockjs.createServer(
            {
                sockjs_url: connConfig.sockjsUrl
            }
        );
        transport.echo.on('connection', function (sockjsClient) {
            var msg;
            transport.connections.push(sockjsClient);
            sockjsClient.on('data', function (message) {
                console.log('some data', message);
                try {
                    msg = JSON.parse(message);
                    if (typeof msg.action !== 'undefined'
                        && msg.action === 'publish'
                        && msg.data
                        && msg.data._context
                        && msg.data._context.source !== transport.id) {
                        if (typeof msg.eventName === 'undefined') {
                            throw Error('[Incomint message] Undefined EventName');
                        }
                        mediator.publish(msg.eventName, msg.data);
                    }
                } catch (err) {
                    if (err instanceof SyntaxError) {
                        console.log(err);
                    } else {
                        throw err;
                    }
                }
            });
            sockjsClient.on('close', function () {
                var indexOfConnection = transport.connections.indexOf(sockjsClient);
                while (indexOfConnection !== -1) {
                    transport.connections.splice(indexOfConnection, 1);
                    indexOfConnection = transport.connections.indexOf(sockjsClient);
                }
            });
        });
        transport.server = http.createServer();
        transport.echo.installHandlers(transport.server, {prefix: connConfig.path});
        transport.server.listen(connConfig.port, connConfig.host);
        console.log('listening on port: ' + connConfig.host + ':' + connConfig.port + ' ');
    },
    publish: function (event, data) {
        var transport = this._outerTransport;

        // Enrich _context with source
        if (typeof data._context === 'undefined') {
            data._context = {};
        }
        console.log(data);
        if (typeof data._context.source === 'undefined') {
            data._context.source = transport.id;
        }

        transport.connections.forEach(function (currentConn) {
            var msg;
            if (typeof currentConn !== 'undefined') {
                msg = JSON.stringify({action:'publish', eventName: event, data: data});
                currentConn.write(msg);
            }
        });
    }
};
