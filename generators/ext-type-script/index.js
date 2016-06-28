'use strict';

var yeoman = require('yeoman-generator'),
    lodash = require('lodash'),
    rimraf = require('rimraf');

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

        pkg.devDependencies = sort(
            lodash.assign(pkg.devDependencies, {
                'gulp-batch': '^1.0.5',
                'gulp-eslint': '^2.0.0',
                'gulp-tslint': '^5.0.0',
                'gulp-htmlmin': '^2.0.0',
                'gulp-sass': '^2.3.2',
                'gulp-sourcemaps': '^1.6.0',
                'gulp-streamify': '^1.0.2',
                'gulp-uglify': '^1.5.3',
                'gulp-watch': '^4.3.8',
                'tsify': '^0.16.0',
                'tslint': '^3.11.0',
                'vinyl-buffer': '^1.0.0',
                'vinyl-source-stream': '^1.1.0'
            })
        );

        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 2);
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'));
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/'));
        this.fs.copy(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json'));
        this.fs.copy(
            this.templatePath('tslint.json'),
            this.destinationPath('tslint.json'));
        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json'));
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    end: function () {
        rimraf.sync(
            this.destinationPath('src/index.js'));
        rimraf.sync(
            this.destinationPath('src/style/style.css'));
    }
});
