var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp');

gulp.task('process-markup', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
