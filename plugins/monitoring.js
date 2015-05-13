module.exports = {
    init: function(mediator){
        //var sockJsServer = require("sockJsServer");
        //var config = mediator.config();

        // init the sock js listening based on configuration (host, port)
        // sockjs.listen(config.port, config.ip)
        //
        // sockjs.on("open", function(){
        //
        // 	save the connection
        // 	conn.on(data, function(data){
        // 		mediator.emit(data.eventname, data.data);
        // 	})
        //
        // })
    },
    subscribe: function (queueName, cb) {
        console.log('subscribe ',queueName,cb,this);
    },
    unsubscribe: function (queueName, cb) {
        console.log('unsubscribe ',queueName,cb,this);
    },
    publish: function(queueName, value){
        console.log('publish ', queueName,value,this);
    }
}