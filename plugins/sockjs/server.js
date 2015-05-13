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
	publish: function(event, data){
		// there was a publish event on your local mediator you 
		// have to send that to the other mediator when the permission is ok
		
		// check permission
		// sockjs.send({event: event, data:data, target: mediator.id});

	}


}