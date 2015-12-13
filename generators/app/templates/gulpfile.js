var gulp = require('gulp'),
    require_dir = require('require-dir');

require_dir('./gulp/tasks');
gulp.task('default', ['lint', 'build']);
