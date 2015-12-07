var assert = require('assert'),
    del = require('del'),
    fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
assert.ok(pkg && pkg.description, 'description required');
assert.ok(pkg && pkg.keywords.length > 0, 'keywords required');
assert.ok(pkg && pkg.name, 'name required');
assert.ok(pkg && pkg.version, 'version required');

var gulp = require('gulp'),
    gulp_concat = require('gulp-concat'),
    gulp_copy = require('gulp-copy'),
    gulp_eslint = require('gulp-eslint'),
    gulp_htmlmin = require('gulp-htmlmin'),
    gulp_mustache = require('gulp-mustache'),
    gulp_rename = require('gulp-rename'),
    gulp_sass = require('gulp-sass'),
    gulp_sourcemaps = require('gulp-sourcemaps'),
    gulp_uglify = require('gulp-uglify'),
    gulp_ver = require('gulp-ver'),
    gulp_zip = require('gulp-zip');

gulp.task('lint', function () {
    return gulp.src([
        './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**'
    ])
    .pipe(gulp_eslint())
    .pipe(gulp_eslint.format())
    .pipe(gulp_eslint.failAfterError());
});

gulp.task('dizmo:plist', function () {
    return gulp.src('.dizmo.plist')
        .pipe(gulp_mustache({
            ALLOW_RESIZE: false,
            API_VERSION: '1.3',
            BUNDLE_DISPLAY_NAME: pkg.name,
            BUNDLE_IDENTIFIER: '<%= bundleId %>',
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
gulp.task('dizmo', ['dizmo:plist']);

gulp.task('help:copy', function () {
    return gulp.src('help/**/*')
        .pipe(gulp_copy('build/{0}/help/'.replace('{0}', pkg.name), {
            prefix: 0
        }));
});
gulp.task('help:zip', ['help:copy'], function () {
    return gulp.src('build/{0}/help/**/*'.replace('{0}', pkg.name))
        .pipe(gulp_zip('help.zip'))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});
gulp.task('help', ['help:zip'], function () {
    return del.sync(['build/{0}/help/'.replace('{0}', pkg.name)]);
});

gulp.task('assets:copy', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});
gulp.task('assets', ['assets:copy'], function () {
    return gulp.src('assets/**/*')
        .pipe(gulp_copy('build/{0}/assets/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});

gulp.task('style:image', function () {
    return gulp.src('src/style/image/**/*')
        .pipe(gulp_copy('build/{0}/style/image/'.replace('{0}', pkg.name), {
            prefix: 3
        }));
});
gulp.task('style', ['style:image'], function () {
    return gulp.src('src/style/*.scss')
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sass({outputStyle: 'compressed'})
            .on('error', gulp_sass.logError))
        .pipe(gulp_sourcemaps.write('./'))
        .pipe(gulp.dest('build/{0}/style/'.replace('{0}', pkg.name)));
});

gulp.task('library:min', function () {
    return gulp.src([
        'src/lib/**/*.js'
    ])
    .pipe(gulp_concat('library.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('src/lib/'));
});
gulp.task('library', function () {
    return gulp.src('src/lib/library.js')
        .pipe(gulp.dest('build/{0}/lib/'.replace('{0}', pkg.name)));
});

gulp.task('script', ['library'], function () {
    return gulp.src([
        'src/index.js'
    ])
    .pipe(gulp_concat('index.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp_htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest('build/{0}/'.replace('{0}', pkg.name)));
});

gulp.task('clean', function () {
    return del.sync(['build/']);
});
gulp.task('all', [
    'clean', 'dizmo', 'help', 'assets', 'style', 'script', 'html'
]);
gulp.task('zip', ['all'], function () {
    return gulp.src('build/**/*')
        .pipe(gulp_zip('{0}.dzm'.replace('{0}', pkg.name)))
        .pipe(gulp_ver())
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['lint', 'zip']);
