var gulp = require('gulp'),
    gulp_coffeelint = require('gulp-coffeelint');

gulp.task('lint', function () {
    gulp.src([
        './src/**/*.coffee', '!src/lib/**', '!build/**', '!node_modules/**'])
        .pipe(gulp_coffeelint())
        .pipe(gulp_coffeelint.reporter())
});
