var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_concat = require('gulp-concat'),
    gulp_uglify = require('gulp-uglify');

gulp.task('index.js', function () {
    return gulp.src(['src/index.js'])
        .pipe(gulp_concat('index.js'))
        .pipe(gulp_uglify())
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
