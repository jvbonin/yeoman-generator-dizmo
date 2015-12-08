'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var lodash = require('lodash');
var path = require('path');
var os = require('os');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('appname', {
            type: String, required: false
        });
        if (this.appname) {
            this.appname = lodash.capitalize(
                lodash.camelCase(this.appname));
        } else {
            this.appname = lodash.capitalize(
                lodash.camelCase(process.cwd()
                    .split('/').pop().split('.').slice(0, -1).join()));
        }
        if (this.appname.length === 0) {
            this.appname = 'MyDizmo';
        }

        this.argument('bundleId', {
            type: String, required: false
        });
        if (this.bundleId) {
            this.bundleId = lodash.snakeCase(this.bundleId);
        } else {
            this.bundleId = lodash.snakeCase(this.appname);
            this.bundleId = 'com.dizmo.' + this.bundleId;
        }
        if (this.bundleId.length === 0) {
            this.appname = 'com.dizmo.my_dizmo';
        }
    },
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the awsome ' + chalk.green.bold('dizmo') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'dizmoName',
            message: 'Name your dizmo:',
            default: this.appname
        }, {
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: 'A hello-world dizmo'
        }, {
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: this.bundleId
        }, {
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: 'Name Surname',
            store: true
        }, {
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: 'name.surname@example.com',
            store: true
        }];

        this.prompt(prompts, function (properties) {
            this.properties = lodash.assign(properties, {
                _: lodash, path: path, os: os
            });

            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('assets/'),
            this.destinationPath('assets/'), this.properties);
        this.fs.copyTpl(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'), this.properties);
        this.fs.copyTpl(
            this.templatePath('help/'),
            this.destinationPath('help/'), this.properties);
        this.fs.copyTpl(
            this.templatePath('src/'),
            this.destinationPath('src/'), this.properties);
        this.fs.copyTpl(
            this.templatePath('.eslintrc.js'),
            this.destinationPath('.eslintrc.js'), this.properties);
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'), this.properties);
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), this.properties);
        this.fs.copyTpl(
            this.templatePath('.info.plist'),
            this.destinationPath('.info.plist'), this.properties);
        this.fs.copyTpl(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'), this.properties);
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), this.properties);
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'), this.properties);
    },

    install: function () {
        this.installDependencies();
    }
});
