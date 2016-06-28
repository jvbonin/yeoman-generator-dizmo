var assert = require('assert');

window.showBack = function () {
    dizmo.showBack();
};
assert.ok(typeof window.showBack === 'function');

window.showFront = function () {
    dizmo.showFront();
};
assert.ok(typeof window.showBack === 'function');

window.document.addEventListener('dizmoready', function () {
    document.getElementById('done').onclick = function () {
        dizmo.showFront();
    };
});
