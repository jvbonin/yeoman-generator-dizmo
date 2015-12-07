var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('assets.dir:copy', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});
gulp.task('assets.dir', ['assets.dir:copy'], function () {
    return gulp.src('assets/**/*')
        .pipe(gulp_copy('build/{0}/assets/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});
