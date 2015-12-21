var maggaMediatorFolder = ['subscribe-and-publish', 'hooks', 'config', 'connections'];

maggaMediatorFolder.forEach(function (testName) {
    require('./maggaMediator/' + testName + '.test.js');
});
