var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_plist = require('gulp-plist'),
    gulp_rename = require('gulp-rename');

gulp.task('info.plist', function () {
    return gulp.src('.info.plist')
        .pipe(gulp_plist({
            BundleDisplayName: pkg.name,
            BundleIdentifier: '<%= bundleId %>',
            BundleName: pkg.name,
            BundleVersion: pkg.version,
            Description: pkg.description,
            Height: 240,
            Tags: pkg.keywords,
            Width: 480
        }))
        .pipe(gulp_rename('Info.plist'))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
