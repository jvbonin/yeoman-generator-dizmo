var pkg = require('../package.js'),
    del = require('del');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy'),
    gulp_zip = require('gulp-zip');

gulp.task('help.zip:copy', function () {
    return gulp.src('help/**/*')
        .pipe(gulp_copy('build/{0}/help/'.replace('{0}', pkg.name), {
            prefix: 0
        }));
});
gulp.task('help.zip:compress', ['help.zip:copy'], function () {
    return gulp.src('build/{0}/help/**/*'.replace('{0}', pkg.name))
        .pipe(gulp_zip('help.zip'))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
gulp.task('help.zip', ['help.zip:compress'], function () {
    return del.sync(['build/{0}/help/'.replace('{0}', pkg.name)]);
});
