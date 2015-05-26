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
            console.log('open');
        };
        transport.sockjsClient.onmessage = function (e) {
            console.log('message', e.data);
        };
        transport.sockjsClient.onclose = function () {
            console.log('close');
        };
    },
    publish: function () {
        var config, permissions, transport;
        transport = this._outerTransport;
        config = this.config();
        permissions = config.plugins.sockjs.permissions;
        if (
            permissions && (
            permissions.publish !== 'local' ||
            permissions.publish !== 'off'
            )) {
            transport.sockjsClient.send({
                event: permissions.publish,
                data: {data: 'data'},
                target: transport.id
            });
        }
    }
};
