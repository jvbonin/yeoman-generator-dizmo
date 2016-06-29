var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

var watched = watchify(browserify({
    basedir: '.', entries: ['src/index.js'],
    cache: {}, packageCache: {}, debug: true
}));

var on_watch = function () {
    return watched.bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(path.join('build', pkg.name)));
};

watched.on('update', on_watch);
watched.on('log', gulp_util.log);
gulp.task('process-scripts:watch', on_watch);
