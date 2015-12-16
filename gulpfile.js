'use strict';

var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var ex_gitignore = require('gulp-exclude-gitignore');
var nsp = require('gulp-nsp');

gulp.task('static', function () {
    return gulp.src('**/*.js')
        .pipe(ex_gitignore())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
    nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static']);
