var assert = require('assert'),
    fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
assert.ok(pkg && pkg.description, 'description required');
assert.ok(pkg && pkg.keywords.length > 0, 'keywords required');
assert.ok(pkg && pkg.name, 'name required');
assert.ok(pkg && pkg.version, 'version required');

module.exports = pkg;