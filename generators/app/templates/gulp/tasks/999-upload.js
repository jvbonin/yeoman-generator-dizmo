var pkg = require('../package.js'),
    gulp = require('gulp'),
    lodash = require('lodash');

var assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    process = require('process'),
    url = require('url');

gulp.task('upload', ['build:dzm'], function () {
    var upload_bid = process.env.DIZMO_SETTINGS_BUNDLE_ID
        || pkg.dizmo.settings && pkg.dizmo.settings['bundle-identifier'];
    var upload_url = process.env.DIZMO_URLS_UPLOAD
        || pkg.dizmo.urls && pkg.dizmo.urls.upload;
    var upload_usr = process.env.DIZMO_CREDENTIALS_USERNAME
        || pkg.dizmo.credentials && pkg.dizmo.credentials.username;
    var upload_pwd = process.env.DIZMO_CREDENTIALS_PASSWORD
        || pkg.dizmo.credentials && pkg.dizmo.credentials.password;

    assert(upload_url, 'package.dizmo.settings.bundle-identifier required');
    assert(upload_url, 'package.dizmo.urls.upload required');

    var options = url.parse(upload_url),
        path = 'build/{0}-{1}.dzm'
            .replace('{0}', pkg.name)
            .replace('{1}', pkg.version);

    var auth = '';
    if (upload_usr) {
        if (upload_pwd) {
            auth += upload_usr + ':' + upload_pwd;
        } else {
            auth += upload_usr;
        }
    } else {
        if (upload_pwd) {
            auth += upload_pwd;
        }
    }
    if (auth && !options.auth) {
        lodash.extend(options, {auth: auth});
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    var protocol = options.protocol === 'http: ' ?
        http : https;

    fs.readFile(path, function (err, data) {
        if (err) throw err;

        var auth_json = JSON.stringify({
            username: upload_usr, password: upload_pwd
        });

        var opt0 = lodash.extend(options, {
            method: 'POST', path: '/v1/oauth/login',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': auth_json.length
            }
        });

        var req0 = protocol.request(opt0, function (res0) {
            console.log('[RES:STATUS]', res0.statusCode);
            console.log('[RES:STATUS]', res0.statusMessage);
            console.log('[RES:HEADER]', JSON.stringify(res0.headers));

            var opt1 = lodash.extend(options, {
                method: 'PUT', path: '/v1/dizmo/' + upload_bid,
                headers: {'Content-Length': data.length}
            });

            var req1 = protocol.request(opt1, function (res1) {
                if (res1.statusCode === 200) return;

                console.log('[REQ:OPTION]', opt1);
                console.log('[RES:STATUS]', res1.statusCode);
                console.log('[RES:STATUS]', res1.statusMessage);
                console.log('[RES:HEADER]', JSON.stringify(res1.headers));

                var opt2 = lodash.extend(options, {
                    method: 'POST', path: '/v1/dizmo',
                    headers: {'Content-Length': data.length}
                });

                var req2 = protocol.request(opt2, function (res2) {
                    console.log('[REQ:OPTION]', opt2);
                    console.log('[RES:STATUS]', res2.statusCode);
                    console.log('[RES:STATUS]', res2.statusMessage);
                    console.log('[RES:HEADER]', JSON.stringify(res2.headers));
                });

                req2.on('error', function (error) {
                    console.log('[REQ:ERROR]', error);
                });

                req2.write(data);
                req2.end();
            });

            req1.on('error', function (error) {
                console.log('[REQ:ERROR]', error);
            });

            req1.write(data);
            req1.end();
        });

        req0.on('error', function (error) {
            console.log('[REQ:ERROR]', error);
        });

        req0.write(auth_json);
        req0.end();
    });
});
