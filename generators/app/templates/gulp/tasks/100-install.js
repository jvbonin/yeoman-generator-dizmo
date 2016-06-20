var pkg = require('../package.js'),
    gulp = require('gulp'),
    os = require('os'),
    path = require('path');

var install_to = process.env.DIZMO_INSTALL_TO
    || pkg.dizmo['install-to']
    || '';

if (install_to) {
    gulp.task('install', ['build:dzm'], function () {
        if (path.isAbsolute(install_to) === false) {
            install_to = path.join(os.homedir(), install_to);
        }

        return gulp.src('build/{0}/**/*'.replace('{0}', pkg.name))
            .pipe(gulp.dest(path.join(install_to,
                pkg.dizmo.settings['bundle-identifier'])));
    });
} else {
    gulp.task('install', ['build:dzm']);
}
