MaggaMediator = (function () {
    console.log("gladitor new instance");
});

MaggaMediator.prototype.connect= function(data,connections){
    var conn = data.type;

    if(typeof window !== 'undefined'){
        //browser
        conn.init({host:data.host,port:data.port,path:data.path},connections);
    }else{
        //server
        return conn.init({host:data.host,port:data.port,path:data.path},connections);
    }
};

module.exports = MaggaMediator;