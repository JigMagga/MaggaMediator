'use strict';
var MaggaMediator = require('maggaMediator.js');

describe.only('hooks', function () {
  MaggaMediator = new MaggaMediator();
  MaggaMediator.subscribe('channel:one', function () {
    console.log("smthg published");
  });
  MaggaMediator.publish('channel:one', 'magic data');

});