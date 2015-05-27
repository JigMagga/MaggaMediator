var MaggaMediator = require('maggaMediator.js');

function connect(sockClient) {
    sockClient.onopen = function () {
        console.log('connection opened');
        sockClient.send(JSON.stringify({eventName: 'serviceChannel', data: 'test'}));
    };
    sockClient.onmessage = function (e) {
        console.log('incoming message');
        msg = JSON.parse(e.data);
        console.log(msg);
        if (typeof msg.event === 'string'
            && msg.event === 'chatChannel') {
            $("#chat").append('<p>' + msg.data.name + ' wrote: ' + msg.data.text + '</p>');
        }

    };
    sockClient.onclose = function() {
        console.log('connection closed');
        setTimeout(function(){
            console.log('Attempting to connect...');
            var sock = new SockJS('http://localhost:8080/mediator');
            connect(sock);
        },5000);
    };
}

mediator = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator'
        },
        monitoring:{}
    }
});

//var sock = new SockJS('http://localhost:8080/mediator');
//connect(sock);


$("#name").first().val(function(){
    var id = Math.floor(Math.random()*1000);
    return 'Incognito_'+id;
}());

mediator.subscribe('dummyChannel', function(msg){
    console.log(msg);
});

$("#form").submit(function(e){
    var msg,message;
    e.preventDefault();
    msg = {
        name: $("#name").first().val(),
        text: $("#msg").first().val()
    };
    console.log('msg',msg);
    message = JSON.stringify({
        action:'publish',
        eventName:'chatChannel',
        data:msg
    });
    sock.send(message);
    $("#msg").first().val("");
});