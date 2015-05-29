// TODO Implement Message data envelope in a right way

function Message(data) {
    // We use _md = 1 in data to understand i
    if (typeof data === 'object' && data._u === 1) {
        this._data = data._data;
        this._context = data._context;
    } else {
        this._data = data;
        this._context = {};
    }
    this._u = 1;
}

Message.prototype.getData = function () {
    return this._data;
};

Message.prototype.getContext = function (contextKey) {
    return this._context[contextKey];
};

Message.prototype.setContext = function (contextKey, value) {
    this._context[contextKey] = value;
};

module.exports = Message;
