var _mediator = null;
var _config = null;
var _conn = null;

var init = function(mediator){
    _mediator = mediator;
    _config = mediator.config();
    var path = "http://".concat(_config.host,":",_config.port,_config.path);

    _conn = require('sockjs-client');
    _conn = new _conn(path);

    _conn.onopen = function() {
        console.log('open');
    };
    _conn.onmessage = function(e) {
        console.log('message', e.data);
    };
    _conn.onclose = function() {
        console.log('close');
    };

    _conn.send('test');
};

var publish = function(){
    var dontPublishWhen = ["local","off"];
    if(dontPublishWhen.indexOf(_config.permission) > -1 ){
        _conn.write({event: event, data:data, target: mediator.id});
    }
};

module.exports = {
	init: init,
	publish: publish
};