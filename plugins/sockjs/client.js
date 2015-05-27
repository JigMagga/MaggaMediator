module.exports = {
    init: function (mediator) {
        var config, connConfig, path, SockjsClient, transport;
        config = mediator.config();
        connConfig = config.plugins.sockjs;
        path = 'http://'.concat(connConfig.host, ':', connConfig.port, connConfig.path);

        // Adding wrapping object to the Mediator
        // The structure would be
        // mediator._outerTransport:{sockjsClient:sockjsClient}
        transport = mediator._outerTransport = {};
        // Resulting something like "sockjs-client_613_1432631174226"
        transport.id = 'sockjs-client_'.concat(Math.floor(Math.random() * 1000), '_', +new Date());
        SockjsClient = require('sockjs-client');
        transport.sockjsClient = new SockjsClient(path);
        transport.sockjsClient.onopen = function () {

        };
        transport.sockjsClient.onmessage = function (e) {
            var msg;
            console.log('incoming message');
            msg = JSON.parse(e.data);
            console.log(msg);
            // TODO !!! We need to invent reliable and robust system for preventing infinite loops
            // and applying permissions.
            // Now we publish event locally only if its source is external.
            // Otherwise we will get infinite loop
            if (typeof msg.event === 'string'
                && msg._context
                && msg._context.source !== transport.id) {
                mediator.publish(msg.event, msg.data);
            }
        };
        transport.sockjsClient.onclose = function () {
//            console.log('close');
            delete mediator._outerTransport;
        };
    },
    publish: function (event, data) {
        var config, permissions, transport, message;
        transport = this._outerTransport;

        // Enrich _context with source
        if (typeof data._context === 'undefined') {
            data._context = {};
        }

        if (typeof data._context.source === 'undefined') {
            data._context.source = transport.id;
        }

        config = this.config();
        permissions = config.plugins.sockjs.permissions;
        message = JSON.stringify({
            action: 'publish',
            eventName: event,
            data: data
        });
        transport.sockjsClient.send(message);
    }
};
