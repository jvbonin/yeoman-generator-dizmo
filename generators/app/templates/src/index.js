window.showBack = function () {
    dizmo.showBack();
};

window.document.addEventListener('dizmoready', function() {
    document.getElementById('done').onclick = function() {
        dizmo.showFront();
    };
});
