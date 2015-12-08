var pkg = require('../package.js');
var assert = require('assert');
var gulp = require('gulp');
var path = require('path');
var os = require('os');

gulp.task('deploy', ['dizmo:zip'], function () {
    assert(pkg.dizmo && pkg.dizmo['deploy-to'], 'dizmo.deploy-to required');

    var deploy_to =
        path.isAbsolute(pkg.dizmo['deploy-to']) ?  pkg.dizmo['deploy-to'] :
            path.join(os.homedir(), pkg.dizmo['deploy-to']);

    return gulp.src('build/**/*.dzm').pipe(gulp.dest(deploy_to));
});
