var gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp.src([
        './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**'])
        .pipe(gulp_eslint())
        .pipe(gulp_eslint.format())
        .pipe(gulp_eslint.failAfterError());
});

