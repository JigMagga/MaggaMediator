var maggaMediatorFolder = ['subscribe-and-publish', 'hooks'];

maggaMediatorFolder.forEach(function (testName) {
    require('./maggaMediator/' + testName + '.test.js');
});
