'use strict';

var chalk = require('chalk');
var lodash = require('lodash');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('install-to', {
            defaults: process.env.DIZMO_INSTALL_TO || '',
            desc: 'Dizmo installation path',
            type: String, alias: 'i'
        });

        this.argument('dizmoName', {
            type: String, required: false
        });
        if (this.dizmoName) {
            this.dizmoName = lodash.capitalize(
                lodash.camelCase(this.dizmoName));
        } else {
            this.dizmoName = lodash.capitalize(
                lodash.camelCase(process.cwd()
                    .split('/').pop().split('.').slice(0, -1).join()));
        }
        if (!this.dizmoName) {
            this.dizmoName = 'MyDizmo';
        }

        this.argument('dizmoDescription', {
            type: String, required: false
        });
        if (!this.dizmoDescription) {
            this.dizmoDescription = lodash.startCase(this.dizmoName);
        }

        this.argument('bundleId', {
            type: String, required: false
        });
        if (!this.bundleId) {
            this.bundleId = lodash.snakeCase(this.dizmoName);
            this.bundleId = 'com.example.' + this.bundleId;
        } else {
            this.bundleId = lodash.snakeCase(this.bundleId);
        }

        this.argument('personName', {
            type: String, required: false
        });
        if (!this.personName) {
            this.personName = process.env.USER || '';
        }

        this.argument('personEmail', {
            type: String, required: false
        });
        if (!this.personEmail) {
            this.personEmail = process.env.MAIL || '';
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
            default: this.dizmoName
        }, {
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: this.dizmoDescription
        }, {
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: this.bundleId
        }, {
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: this.personName,
            store: true
        }, {
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: this.personEmail,
            store: true
        }];

        this.prompt(prompts, function (properties) {
            this.properties = lodash.assign(properties, {
                installTo: this.options['install-to'],
                _: lodash
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
            this.templatePath('.npmignore'),
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
        this.npmInstall('', {'cache-min': 604800});
    }
});
