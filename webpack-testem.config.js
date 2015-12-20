var hostname = 'localhost',
    port = '3000';
module.exports = {
    entry: ['./test/setup.js', './test/index.js'],
    output: {
        filename: 'test.bundle.js',
        path: 'test/',
        publicPath: 'http://' + hostname + ':' + port + '/test'
    },
    externals: {
        MaggaMediator: 'MaggaMediator'
    },
    module: {
    },
    devServer: {
        host: 'localhost',
        port: '3000'
    }
};
