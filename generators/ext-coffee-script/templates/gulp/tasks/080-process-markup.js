var pkg = require('../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_htmlmin = require('gulp-htmlmin');

gulp.task('process-markup', function () {
    return gulp.src('src/index.html')
        .pipe(gulp_htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
