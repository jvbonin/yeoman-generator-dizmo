'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var toUnderscoreCase = function (string) {
    return string.replace(/\.?([A-Z]+)/g, function (_, part) {
        return '_' + part.toLowerCase();
    }).replace(/^_/, '');
};

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the awsome ' + chalk.green.bold('dizmo') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'dizmoName',
            message: 'Name your dizmo:',
            default: 'MyDizmo'
        }, {
            type: 'input',
            name: 'dizmoDescription',
            message: 'Describe it:',
            default: 'A hello-world dizmo'
        }, {
            type: 'input',
            name: 'bundleId',
            message: 'And its bundle ID?',
            default: 'com.example.my_dizmo'
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
            this.properties = properties;
            this.properties.dizmoNameUnderscored =
                toUnderscoreCase(this.properties.dizmoName);
            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copy(
            this.templatePath('assets/'),
            this.destinationPath('assets/'));
        this.fs.copy(
            this.templatePath('help/'),
            this.destinationPath('help/'));
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/'));

        this.fs.copy(
            this.templatePath('.eslintrc.js'),
            this.destinationPath('.eslintrc.js'));
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'));
        this.fs.copy(
            this.templatePath('.info.plist'),
            this.destinationPath('.info.plist'));
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), this.properties);
        this.fs.copy(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'));
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
