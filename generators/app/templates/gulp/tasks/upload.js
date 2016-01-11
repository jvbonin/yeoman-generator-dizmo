var pkg = require('../package.js'),
    gulp = require('gulp'),
    lodash = require('lodash');

var assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    process = require('process'),
    url = require('url');

gulp.task('upload', ['build:zip'], function () {
    var upload_url = process.env.DIZMO_URLS_UPLOAD
        || pkg.dizmo.urls && pkg.dizmo.urls.upload;
    var upload_usr = process.env.DIZMO_CREDENTIALS_USERNAME
        || pkg.dizmo.credentials && pkg.dizmo.credentials.username;
    var upload_pwd = process.env.DIZMO_CREDENTIALS_PASSWORD
        || pkg.dizmo.credentials && pkg.dizmo.credentials.password;

    if (upload_url) {
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

        fs.readFile(path, function (err, data) {
            if (!err) {
                var req = http.request(lodash.extend(options, {
                    method: 'POST', headers: {'Content-Length': data.length}
                }));

                req.write(data);
                req.end();
            }

            else throw err;
        });
    }
});
