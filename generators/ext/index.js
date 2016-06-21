'use strict';

var lodash = require('lodash');
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
        this.fs.copy(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'));
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/'));
        this.fs.delete(
            this.destinationPath('src/style/style.css'));
        this.fs.copy(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json'));
        var pkg = this.fs.readJSON(
            this.destinationPath('package.json'));
        lodash.assign(pkg.devDependencies, {
            'gulp-batch': '^1.0.5',
            'gulp-eslint': '^2.0.0',
            'gulp-htmlmin': '^2.0.0',
            'gulp-sass': '^2.3.2',
            'gulp-sourcemaps': '^1.6.0',
            'gulp-streamify': '^1.0.2',
            'gulp-uglify': '^1.5.3',
            'gulp-watch': '^4.3.8'
        });
        pkg.devDependencies = sort(
            pkg.devDependencies
        );
        this.fs.writeJSON(
            this.destinationPath('package.json'), pkg, null, 4);
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    }
});
