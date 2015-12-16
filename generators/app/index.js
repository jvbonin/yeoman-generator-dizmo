'use strict';

var chalk = require('chalk');
var lodash = require('lodash');
var path = require('path');
var process = require('process');
var shell = require('shelljs');
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
        this.option('git', {
            defaults: false,
            desc: 'GIT initialization',
            type: Boolean
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
            type: String, required: false,
            defaults: this.user.git.name() || process.env.USER
        });
        this.argument('personEmail', {
            type: String, required: false,
            defaults: this.user.git.email() || process.env.MAIL
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
            default: this.personName
        }, {
            store: true,
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: this.personEmail
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
        if (this.options.git) {
            this.destinationRoot(
                lodash.kebabCase(this.properties.dizmoName) + '.git');
        } else {
            this.destinationRoot(
                lodash.kebabCase(this.properties.dizmoName));
        }
    },

    writing: function () {
        this.template(
            this.templatePath('assets/'),
            this.destinationPath('assets/'), this.properties);
        this.template(
            this.templatePath('gulp/'),
            this.destinationPath('gulp/'), this.properties);
        this.template(
            this.templatePath('help/'),
            this.destinationPath('help/'), this.properties);
        this.template(
            this.templatePath('src/'),
            this.destinationPath('src/'), this.properties);
        this.template(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), this.properties);
        this.template(
            this.templatePath('.info.plist'),
            this.destinationPath('.info.plist'), this.properties);
        this.template(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'), this.properties);
        this.template(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), this.properties);
        this.template(
            this.templatePath('README.md'),
            this.destinationPath('README.md'), this.properties);

        if (this.options.git) {
            this.template(
                this.templatePath('.npmignore'),
                this.destinationPath('.gitignore'), this.properties);
        } else {
            this.template(
                this.templatePath('.npmignore'),
                this.destinationPath('.npmignore'), this.properties);
        }
    },

    install: function () {
        this.npmInstall('', {'cache-min': 604800});
    },

    git: function () {
        if (this.options.git && shell.which('git')) {
            this.spawnCommand(shell.which('git'), [
                'init', '--quiet', this.destinationPath()
            ]);
        }
    }
});
