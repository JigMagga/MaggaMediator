MaggaMediator = (function () {
    console.log("gladitor new instance");
});

var c11nType = null;

MaggaMediator.prototype.connect= function(data){
    c11nType = data.c11nType;
    c11nType.init(data);
};

MaggaMediator.prototype.subscribe= function(event){
    c11nType.subscribe(event);
};

MaggaMediator.prototype.publish= function(event){
    c11nType.publish(event);
};

module.exports = MaggaMediator;