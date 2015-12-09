var pkg = require('../package.js'),
    path = require('path'),
    rimraf = require('rimraf');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy'),
    gulp_zip = require('gulp-zip');

gulp.task('help.zip:copy', function () {
    return gulp.src('help/**/*')
        .pipe(gulp_copy(path.join('build', pkg.name, 'help'), {
            prefix: 0
        }));
});
gulp.task('help.zip:compress', ['help.zip:copy'], function () {
    return gulp.src('build/{0}/help/**/*'.replace('{0}', pkg.name))
        .pipe(gulp_zip('help.zip'))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
gulp.task('help.zip', ['help.zip:compress'], function () {
    return rimraf.sync(path.join('build', pkg.name, 'help'));
});
