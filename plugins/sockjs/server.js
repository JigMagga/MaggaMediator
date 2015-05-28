var Unit = require('unit.js');
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
            var msg, data, eventName, action;
            transport.connections.push(sockjsClient);
            sockjsClient.on('data', function (message) {
                console.log('some data', message);
                try {
                    msg = JSON.parse(message);
                    action = msg.action;
                    eventName = msg.eventName;
                    data = new Unit(msg.data);
                    if (action === 'publish'
                        && data.getContext('source') !== transport.id) {
                        if (typeof msg.eventName === 'undefined') {
                            throw Error('[Incomint message] Undefined EventName');
                        }
                        mediator.publish(eventName, data);
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

        if (!(data instanceof Unit)) {
            throw TypeError('data parameter doesn\'t have type of Unit');
        }

        // Enrich _context with source
        if (data.getContext('source') === null) {
            data.setContext('source', transport.id);
        }
        console.log(data);

        transport.connections.forEach(function (currentConn) {
            var msg;
            if (typeof currentConn !== 'undefined') {
                msg = JSON.stringify({action: 'publish', eventName: event, data: data});
                currentConn.write(msg);
            }
        });
    }
};
