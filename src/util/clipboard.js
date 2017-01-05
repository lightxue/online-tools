var fakeHandler, fakeElem;

function select(element) {
    var selectedText;

    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    } else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

function selectFake(text) {
    var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

    removeFake();

    fakeHandler = document.body.addEventListener('click', removeFake);

    fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS;
    fakeElem.style.fontSize = '12pt';
    // Reset box model;
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    // Move element out of screen horizontally;
    fakeElem.style.position = 'fixed';
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically;
    fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;

    document.body.appendChild(fakeElem);

    select(fakeElem);
}

//Only removes the fake element after another click event, that way
//a user can hit `Ctrl+C` to copy because selection still exists.
function removeFake() {
    if (fakeHandler) {
        document.body.removeEventListener('click');
        fakeHandler = null;
    }

    if (fakeElem) {
        document.body.removeChild(fakeElem);
        fakeElem = null;
    }
}

//Executes the copy operation based on the current selection.
function copyText() {
    var succeeded;
    try {
        succeeded = document.execCommand('copy');
    } catch (err) {
        succeeded = false;
    }
    return succeeded;
}

function copy(text) {
    selectFake(text);
    return copyText();
}

export default {
    copy: copy,
}
