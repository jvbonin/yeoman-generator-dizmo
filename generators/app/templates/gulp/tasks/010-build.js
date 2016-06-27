var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('build:all', [
    'clean:build#dzm',
    'process-help',
    'process-assets',
    'process-styles',
    'process-scripts',
    'process-markup',
    'process-properties',
    'process-libs'
]);
gulp.task('build:dzm', ['build:all'], function () {
    return gulp.src('build/**/*')
        .pipe(gulp_zip('{0}.dzm'.replace('{0}', pkg.name)))
        .pipe(gulp_ver())
        .pipe(gulp.dest('build'));
});
gulp.task('build', ['build:dzm']);
