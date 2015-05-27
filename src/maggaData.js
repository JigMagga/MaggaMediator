// TODO Implement data envelope in a right way

function MaggaData(data) {
    this._data = data;
    this._context = {};
}


MaggaData.prototype.getData = function () {
    return this._data;
};

MaggaData.prototype.getContext = function (contextKey) {
    return this._context[contextKey];
};

MaggaData.prototype.setContext = function (contextKey, value) {
    this._context[contextKey] = value;
};

module.exports = MaggaData;
