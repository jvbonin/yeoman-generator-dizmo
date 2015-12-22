var pkg = require('../package.js'),
    gulp = require('gulp'),
    lodash = require('lodash');

var assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    process = require('process'),
    url = require('url');

gulp.task('upload', ['build:zip'], function () {
    assert(process.env.DIZMO_STORE, 'URL required');
    var options = url.parse(process.env.DIZMO_STORE),
        path = 'build/{0}-{1}.dzm'
            .replace('{0}', pkg.name)
            .replace('{1}', pkg.version);

    var auth = '';
    if (process.env.DIZMO_STORE_USER) {
        if (process.env.DIZMO_STORE_PASS) {
            auth += process.env.DIZMO_STORE_USER;
            auth += ':';
            auth += process.env.DIZMO_STORE_PASS;
        } else {
            auth += process.env.DIZMO_STORE_USER;
        }
    } else {
        if (process.env.DIZMO_STORE_PASS) {
            auth += process.env.DIZMO_STORE_PASS;
        }
    }
    if (auth && !options.auth) {
        lodash.extend(options, {auth: auth});
    }

    fs.readFile(path, function (err, data) {
        if (err) throw err;

        var req = http.request(lodash.extend(options, {
            method: 'POST', headers: {'Content-Length': data.length}
        }));

        req.write(data);
        req.end();
    });
});
