var pkg = require('../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_coffee = require('gulp-coffee'),
    gulp_concat = require('gulp-concat'),
    gulp_uglify = require('gulp-uglify');

gulp.task('process-scripts:coffee', function () {

    var src_list = [];
    src_list.push(path.join('src', 'index.coffee'));

    return gulp.src(src_list)
        .pipe(gulp_coffee({bare: true}).on('error', console.log))
        .pipe(gulp_concat('index.js'))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(path.join('build', pkg.name)));
});

gulp.task('process-scripts', ['process-scripts:coffee']);
