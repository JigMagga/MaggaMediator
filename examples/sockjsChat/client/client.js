var MaggaMediator = require('maggaMediator.js');
mediator = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator'
        }
    },
    loadPlugins: ['simple', 'monitoring']
});

// var sock = new SockJS('http://localhost:8080/mediator');
// connect(sock);


$("#name").first().val(function(){
    var id = Math.floor(Math.random()*1000);
    return 'Incognito_'+id;
}());

mediator.subscribe('dummyChannel', function(msg){
    console.log('From dummychannel ',msg);
});

mediator.subscribe('chatChannel', function(msg){
    $("#chat").append('<p>' + msg.name + ' wrote: ' + msg.text + '</p>');
});

$("#form").submit(function(e){
    var msg,message;
    e.preventDefault();
    msg = {
        name: $("#name").first().val(),
        text: $("#msg").first().val()
    };
    console.log('msg',msg);
    mediator.publish('chatChannel',msg);
    $("#msg").first().val("");
});