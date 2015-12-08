var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_concat = require('gulp-concat');

gulp.task('library.js:concat', function () {
    return gulp.src([
        'src/lib/assert/assert-1.3.0.min.js'
    ])
    .pipe(gulp_concat('library.js'))
    .pipe(gulp.dest('src/lib/'));
});
gulp.task('library.js', ['library.js:concat'], function () {
    return gulp.src('src/lib/library.js')
        .pipe(gulp.dest('build/{0}/lib/'.replace('{0}', pkg.name)));
});
