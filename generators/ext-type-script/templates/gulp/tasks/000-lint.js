var gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint'),
    gulp_tslint = require("gulp-tslint");

gulp.task('lint:ts', function () {
    return gulp.src([
        './src/**/*.ts', '!src/lib/**', '!build/**', '!node_modules/**'])
        .pipe(gulp_tslint({
            configuration: '.tslint.json'
        }))
        .pipe(gulp_tslint.report("verbose", {
            emitError: false
        }));
});

gulp.task('lint:js', function () {
    return gulp.src([
        './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**'])
        .pipe(gulp_eslint())
        .pipe(gulp_eslint.format());
});

gulp.task('lint', ['lint:ts', 'lint:js']);
