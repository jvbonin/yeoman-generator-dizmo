var showBack = function () {
    dizmo.showBack();
};
if (typeof assert !== 'undefined') {
    assert(typeof showBack === 'function');
}

var showFront = function () {
    dizmo.showFront();
};
if (typeof assert !== 'undefined') {
    assert(typeof showFront === 'function');
}

window.document.addEventListener('dizmoready', function () {
    document.getElementById('done').onclick = function () {
        dizmo.showFront();
    };
});
