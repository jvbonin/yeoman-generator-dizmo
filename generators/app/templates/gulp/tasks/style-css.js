var pkg = require('../package.js'),
    path = require('path');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('style.css:copy', function () {
    return gulp.src(['src/style/**/*', '!src/style/**/*.scss'])
        .pipe(gulp_copy(path.join('build', pkg.name, 'style'), {
            prefix: 2
        }));
});
gulp.task('style.css', ['style.css:copy'], function () {
    return gulp.src('src/style/*.css')
        .pipe(gulp.dest(path.join('build', pkg.name, 'style')));
});
