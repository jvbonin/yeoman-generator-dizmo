var pkg = require('../package.js');
var gulp = require('gulp'),
    gulp_mustache = require('gulp-mustache'),
    gulp_rename = require('gulp-rename');

gulp.task('info.plist', function () {
    return gulp.src('.info.plist')
        .pipe(gulp_mustache({
            ALLOW_RESIZE: false,
            API_VERSION: '1.3',
            BUNDLE_DISPLAY_NAME: pkg.name,
            BUNDLE_IDENTIFIER: 'com.example.my_dizmo',
            BUNDLE_NAME: pkg.name,
            BUNDLE_VERSION: pkg.version,
            CATEGORY: 'none',
            DESCRIPTION: pkg.description,
            ELEMENTS_VERSION: '1.0',
            FORCE_UPDATE: false,
            HEIGHT: 240,
            HIDDEN_DIZMO: false,
            MAIN_HTML: 'index.html',
            MIN_SPACE_VERSION: '0.0.0',
            TAGS: pkg.keywords,
            TITLE_EDITABLE: true,
            WIDTH: 480
        }))
        .pipe(gulp_rename('Info.plist'))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
