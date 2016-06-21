var gulp = require('gulp'),
    gulp_watch = require('gulp-watch'),
    gulp_batch = require('gulp-batch');

gulp.task('watch', function () {
    gulp_watch([
        '**/*', '!build', '!node_modules'
    ], gulp_batch({
        timeout: 256
    }, function (events, done) {
        gulp.start('install', done);
    }));
});
