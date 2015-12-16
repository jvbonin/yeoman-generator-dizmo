'use strict';

var chalk = require('chalk');
var lodash = require('lodash');
var path = require('path');
var process = require('process');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('install-to', {
            defaults: process.env.DIZMO_INSTALL_TO || '',
            desc: 'Default dizmo installation path',
            type: String
        });

        this.argument('dizmoName', {
            type: String, required: false, defaults: 'MyDizmo'
        });
        this.argument('dizmoDescription', {
            type: String, required: false
        });
        this.argument('bundleId', {
            type: String, required: false
        });
        this.argument('personName', {
            type: String, required: false
        });
        this.argument('personEmail', {
            type: String, required: false
        });
    },
    prompting: function () {
        var self = this,
            done = this.async();

        this.log(yosay(
            'Welcome to the awsome ' + chalk.green.bold('dizmo') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'dizmoName',
            message: 'Name your dizmo:',
            default: function () {
                return lodash.capitalize(lodash.camelCase(
                    self.dizmoName
                ));
            }
        }, {
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: function (p) {
                return self.dizmoDescription || lodash.startCase(
                     p.dizmoName
                );
            }
        }, {
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: function (p) {
                return self.bundleId || 'com.example.' + lodash.snakeCase(
                    p.dizmoName
                );
            }
        }, {
            store: true,
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: function () {
                return self.personName || process.env.USER || '';
            }
        }, {
            store: true,
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: function () {
                return self.personEmail || process.env.MAIL || '';
            }
        }];

        this.prompt(prompts, function (properties) {
            this.properties = lodash.assign(properties, {
                installTo: this.options['install-to'],
                _: lodash
            });
            done();
        }.bind(this));
    },

    configuring: function () {
        this.destinationRoot(lodash.kebabCase(this.properties.dizmoName));
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
