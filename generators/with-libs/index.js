'use strict';

var yeoman = require('yeoman-generator'),
    lodash = require('lodash'),
    rimraf = require('rimraf'),
    path = require('path');

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
    configuring: function () {
        var pkg = this.fs.readJSON(
            this.destinationPath('package.json'));

        pkg.scripts = sort(
            lodash.assign(pkg.scripts, {
                'make:with-libs': [
                    'node', './node_modules/gulp/bin/gulp.js', 'build:with-libs'
                ].join(' ')
            })
        );
        pkg.dependencies = sort(
            lodash.assign(pkg.dependencies, {
                'lodash': '^4.13.1'
            })
        );
        pkg.devDependencies = sort(
            lodash.assign(pkg.devDependencies, {
                'gulp-streamify': '^1.0.2',
                'gulp-uglify': '^1.5.3',
                'gulp-sync': '^0.1.4'
            })
        );

        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 2);
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'));
        this.fs.copyTpl(
            this.templatePath('src/'),
            this.destinationPath('src/'), this._pkg());
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    end: function () {
        rimraf.sync(
            this.destinationPath(path.join('build', this._pkg('name'), 'lib')));
        rimraf.sync(
            this.destinationPath('src/lib'));
    },

    _pkg: function (key) {
        if (key !== undefined) {
            return this.fs.readJSON(
                this.destinationPath('package.json'))[key];
        } else {
            return this.fs.readJSON(
                this.destinationPath('package.json'));
        }
    }
});
