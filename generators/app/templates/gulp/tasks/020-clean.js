var gulp = require('gulp'),
    rimraf = require('rimraf');

gulp.task('clean:build#all', function () {
    return rimraf.sync('build')
});
gulp.task('clean:build#dzm', function () {
    return rimraf.sync('build/*.dzm')
});
gulp.task('clean', ['clean:build#all']);
