var pkg = require('../package.js');
var gulp = require('gulp');
var path = require('path');
var os = require('os');

gulp.task('install', ['lint', 'dizmo:all'], function () {
    var install_to = process.env.DIZMO_INSTALL_TO
        || pkg.dizmo['install-to']
        || '';

    if (path.isAbsolute(install_to) === false) {
        install_to = path.join(os.homedir(), install_to);
    }

    return gulp.src('build/{0}/**/*'.replace('{0}', pkg.name)).pipe(gulp.dest(
        path.join(install_to, pkg.dizmo.settings['bundle-identifier'])
    ));
});
