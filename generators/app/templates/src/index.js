var showBack = function () { dizmo.showBack(); };
if (typeof assert !== 'undefined') assert(showBack);
var showFront = function () { dizmo.showFront(); };
if (typeof assert !== 'undefined') assert(showFront);

window.document.addEventListener('dizmoready', function() {
    document.getElementById('done').onclick = function() {
        dizmo.showFront();
    };
});
