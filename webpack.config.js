var path = require('path');

module.exports = {
    entry: {
        maggaMediator: './src/maggaMediator.js',
        plugins: './plugins/plugins.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'jmM',
        libraryTarget: 'umd'
    },

    devtool: 'source-map',

    externals: [
    ]
};
