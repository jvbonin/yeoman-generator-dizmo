var assert = require('assert'),
    fs = require('fs'),
    lodash = require('lodash');

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

assert.ok(pkg,
    'packagerequired');
assert.ok(pkg && pkg.description,
    'package.description required');
assert.ok(pkg && pkg.keywords.length > 0,
    'package.keywords required');
assert.ok(pkg && pkg.name,
    'pacakge.name required');
assert.ok(pkg && pkg.version,
    'package.version required');

assert.ok(pkg && pkg.dizmo,
    'package.dizmo required');
assert.ok(pkg && pkg.dizmo && pkg.dizmo.settings,
    'package.dizmo.settings required');
assert.ok(pkg && pkg.dizmo && pkg.dizmo.settings['bundle-identifier'],
    'package.dizmo.settings.bundle-identifier required');

pkg.dizmo.settings = lodash.assign({
    'bundle-display-name': pkg.name,
    'bundle-name': pkg.name,
    'bundle-version': pkg.version,
    'description': pkg.description,
    'tags': pkg.keywords
}, pkg.dizmo.settings);

module.exports = pkg;
