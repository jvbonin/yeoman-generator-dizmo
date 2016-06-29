var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('process-scripts', function () {
    var browserified = browserify({
        basedir: '.', entries: ['src/index.js']
    });
    return browserified.bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
