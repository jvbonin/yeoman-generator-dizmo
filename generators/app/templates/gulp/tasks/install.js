var pkg = require('../package.js');
var gulp = require('gulp');
var path = require('path');
var os = require('os');

gulp.task('install', ['dizmo:zip'], function () {
    var install_to = process.env.DIZMO_INSTALL_TO
        || pkg.dizmo && pkg.dizmo['install-to']
        || '';

    if (path.isAbsolute(install_to) === false) {
        install_to = path.join(os.homedir(), install_to);
    }

    return gulp.src('build/<%= dizmoName %>/**/*')
        .pipe(gulp.dest(path.join(install_to, '<%= bundleId %>')));
});
