'use strict';

var lodash = require('lodash');
var rimraf = require('rimraf');
var yeoman = require('yeoman-generator');

function sort(dictionary) {
    var array = [],
        sorted = {};

    for(var key in dictionary) {
        array[array.length] = key;
    }
    array.sort();

    for(var i = 0; i < array.length; i++) {
        sorted[array[i]] = dictionary[array[i]];
    }
    return sorted;
}

module.exports = yeoman.generators.Base.extend({
    writing: function () {
        var pkg = this._package();
        this.template(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'), pkg);
        this.template(
            this.templatePath('src/'),
            this.destinationPath('src/'), pkg);
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    _package: function () {
        var pkg = this.fs.readJSON(
            this.destinationPath('package.json'));

        pkg.scripts = sort(lodash.assign(pkg.scripts, {
            'with-libs':
                'node ./node_modules/gulp/bin/gulp.js process-libs:browserify'
        }));
        pkg.devDependencies = sort(lodash.assign(pkg.devDependencies, {
            'browserify': '^12.0.2',
            'gulp-streamify': '^1.0.2',
            'gulp-uglify': '^1.5.3',
            'vinyl-source-stream': '^1.1.0'
        }));

        this.fs.writeJSON(
            this.destinationPath('package.json'), pkg, null, 2);

        return pkg;
    }
});
