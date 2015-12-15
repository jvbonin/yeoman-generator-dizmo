var pkg = require('../package.js'),
    browserify = require('browserify'),
    fs = require('fs'),
    lodash = require('lodash'),
    path = require('path'),
    source = require('vinyl-source-stream');

var gulp = require('gulp'),
    gulp_uglify = require('gulp-uglify'),
    gulp_streamify = require('gulp-streamify');

gulp.task('library.js:browserify', function () {
    var tpl = 'global.{0} = require(\'{1}\');\n',
        buf = '';

    if (pkg.dependencies) for (var dep in pkg.dependencies) {
        if (pkg.dependencies.hasOwnProperty(dep)) {
            buf += tpl
                .replace('{0}', lodash.snakeCase(dep))
                .replace('{1}', dep);
        }
    }

    var file_path = path.join('build', pkg.name, 'lib'),
        file_name = path.join(file_path, 'library.js');

    if (!fs.existsSync(path.join('build')))
        fs.mkdirSync(path.join('build'));
    if (!fs.existsSync(path.join('build', pkg.name)))
        fs.mkdirSync(path.join('build', pkg.name));
    if (!fs.existsSync(path.join('build', pkg.name, 'lib')))
        fs.mkdirSync(path.join('build', pkg.name, 'lib'));

    fs.writeFileSync(file_name, buf);

    return browserify(file_name).bundle()
        .pipe(source('library.js'))
        .pipe(gulp_streamify(gulp_uglify()))
        .pipe(gulp.dest(file_path));
});
gulp.task('library.js', ['library.js:browserify']);
