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
            this.destinationPath('src/index.js'));
        this.fs.delete(
            this.destinationPath('src/style/style.css'));
        this.fs.copy(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json'));
        this.fs.copy(
            this.templatePath('.tslint.json'),
            this.destinationPath('.tslint.json'));
        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json'));
        var pkg = this.fs.readJSON(
            this.destinationPath('package.json'));
        lodash.assign(pkg.devDependencies, {
            'browserify': '^12.0.2',
            'gulp-batch': '^1.0.5',
            'gulp-eslint': '^2.0.0',
            'gulp-tslint': '^5.0.0',
            'gulp-htmlmin': '^2.0.0',
            'gulp-sass': '^2.3.2',
            'gulp-sourcemaps': '^1.6.0',
            'gulp-streamify': '^1.0.2',
            'gulp-uglify': '^1.5.3',
            'gulp-watch': '^4.3.8',
            "tsify": "^0.16.0",
            "tslint": "^3.11.0",
            "vinyl-buffer": "^1.0.0",
            "vinyl-source-stream": "^1.1.0"
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
