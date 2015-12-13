var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('build:all', [
    'clean',
    'assets.dir',
    'help.zip',
    'style.css',
    'index.js',
    'index.html',
    'info.plist'
]);
gulp.task('build:zip', ['build:all'], function () {
    return gulp.src('build/**/*')
        .pipe(gulp_zip('{0}.dzm'.replace('{0}', pkg.name)))
        .pipe(gulp_ver())
        .pipe(gulp.dest('build'));
});
gulp.task('build', ['build:zip']);
