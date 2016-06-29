var pkg = require('../../package.js'),
    path = require('path');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-styles:copy', function () {
    return gulp.src(['src/style/**/*', '!src/style/**/*.scss'])
        .pipe(gulp_copy(path.join('build', pkg.name, 'style'), {
            prefix: 2
        }));
});
gulp.task('process-styles', ['process-styles:copy'], function () {
    return gulp.src('src/style/**/*.css')
        .pipe(gulp.dest(path.join('build', pkg.name, 'style')));
});
