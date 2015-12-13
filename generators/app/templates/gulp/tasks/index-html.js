var pkg = require('../package.js'),
    path = require('path');
var gulp = require('gulp');

gulp.task('index.html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
