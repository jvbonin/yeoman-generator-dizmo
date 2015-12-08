var pkg = require('../package.js'),
    browserify = require('browserify'),
    fs = require('fs'),
    source = require('vinyl-source-stream');

var gulp = require('gulp'),
    gulp_uglify = require('gulp-uglify'),
    gulp_streamify = require('gulp-streamify');

gulp.task('library.js:browserify', function () {
    var tpl = 'global.{0} = require(\'{0}\');\n',
        lib = '';

    if (pkg.dependencies) for (var dep in pkg.dependencies) {
        if (pkg.dependencies.hasOwnProperty(dep)) {
            lib += tpl.replace(/\{0\}/g, dep);
        }
    }

    fs.writeFileSync('./src/lib/library.js', lib);
    return browserify('src/lib/library.js').bundle()
        .pipe(source('library.js'))
        .pipe(gulp_streamify(gulp_uglify()))
        .pipe(gulp.dest('build/{0}/lib/'.replace('{0}', pkg.name)));
});
gulp.task('library.js', ['library.js:browserify']);
