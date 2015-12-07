var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_htmlmin = require('gulp-htmlmin');

gulp.task('index.html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp_htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
