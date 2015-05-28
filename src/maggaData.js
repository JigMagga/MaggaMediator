// TODO Implement data envelope in a right way

function Unit(data) {
    // We use _md = 1 in data to understand i
    if (typeof data === 'object' && data._md === 1) {
        this._data = data._data;
        this._context = data._context;
    } else {
        this._data = data;
        this._context = {};
    }
    this._md = 1;
}

Unit.prototype.getData = function () {
    return this._data;
};

Unit.prototype.getContext = function (contextKey) {
    return this._context[contextKey];
};

Unit.prototype.setContext = function (contextKey, value) {
    this._context[contextKey] = value;
};

module.exports = Unit;
