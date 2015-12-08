var showBack = function () { dizmo.showBack(); };
assert.ok(showBack);
var showFront = function () { dizmo.showFront(); };
assert.ok(showFront);

window.document.addEventListener('dizmoready', function() {
    document.getElementById('done').onclick = function() {
        dizmo.showFront();
    };
});
