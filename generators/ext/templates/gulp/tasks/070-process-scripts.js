var pkg = require('../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_concat = require('gulp-concat'),
    gulp_uglify = require('gulp-uglify');

gulp.task('process-scripts', function () {

    var src_list = [];
    src_list.push(path.join('build', pkg.name, 'coffee.js'));
    src_list.push(path.join('src', 'process-scripts'));

    return gulp.src(src_list)
        .pipe(gulp_concat('process-scripts'))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
