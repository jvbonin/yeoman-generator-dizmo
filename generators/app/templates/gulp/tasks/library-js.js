var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_concat = require('gulp-concat'),
    gulp_uglify = require('gulp-uglify');

gulp.task('library.js:min', function () {
    return gulp.src(['src/lib/**/*.js'])
        .pipe(gulp_concat('library.js'))
        .pipe(gulp_uglify())
        .pipe(gulp.dest('src/lib/'));
});
gulp.task('library.js', ['library.js:min'], function () {
    return gulp.src('src/lib/library.js')
        .pipe(gulp.dest('build/{0}/lib/'.replace('{0}', pkg.name)));
});
