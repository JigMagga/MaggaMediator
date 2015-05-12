/*global describe, it, before, after: true*/

'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    server = require('../index'),
    api = request(server);
    //, sockjsClient = require('sockjs-client');



describe('url CRUD', function () {
    before(function () {
    });

    it('should connect', function (done) {
        api
            .get('./public/index.html')
            .send({})
            .expect(201)
            .end(function (err, res) {
                expect(err).to.eql(null);
                done();
            });
    });
});