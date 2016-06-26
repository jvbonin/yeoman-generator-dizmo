import window from './window';
import dizmo from './dizmo';

window.showBack = function () {
    dizmo.showBack();
};
window.showFront = function () {
    dizmo.showFront();
};

document.addEventListener('dizmoready', function () {
    document.getElementById('done').onclick = function () {
        dizmo.showFront();
    };
});
