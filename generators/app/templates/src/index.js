var showBack = function () { dizmo.showBack(); };
assert(showBack);
var showFront = function () { dizmo.showFront(); };
assert(showFront);

window.document.addEventListener('dizmoready', function() {
    document.getElementById('done').onclick = function() {
        dizmo.showFront();
    };
});
