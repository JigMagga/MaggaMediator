var Unit = require('../../src/unit.js');
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
            var msg, action, eventName, data;
            console.log('incoming message..', e);
            msg = JSON.parse(e.data);
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
        };
        transport.sockjsClient.onclose = function () {
//            console.log('close');
            delete mediator._outerTransport;
        };
    },
    publish: function (event, data) {
        var config, permissions, transport, message;
        transport = this._outerTransport;

        if (!(data instanceof Unit)) {
            throw TypeError('data parameter doesn\'t have type of Unit');
        }
        console.log(data);
        // Enrich _context with source
        if (typeof data.getContext('source') === 'undefined') {
            data.setContext('source', transport.id);

            config = this.config();
            permissions = config.plugins.sockjs.permissions;
            message = JSON.stringify({
                action: 'publish',
                eventName: event,
                data: data
            });
            transport.sockjsClient.send(message);
        }
    }
};
