define(function (require) {
    var Vue = require('vue');

    function select(element) {
        var selectedText

        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            element.focus()
            element.setSelectionRange(0, element.value.length)

            selectedText = element.value
        } else {
            if (element.hasAttribute('contenteditable')) {
                element.focus()
            }

            var selection = window.getSelection()
            var range = document.createRange()

            range.selectNodeContents(element)
            selection.removeAllRanges()
            selection.addRange(range)

            selectedText = selection.toString()
        }

        return selectedText
    }

    // define the item component
    Vue.component('button-copy', {
        template: '#button-copy-template',

        props: {
            text: String
        },

        data: function () {
            return {
            };
        },

        methods: {
            selectFake: function(text) {
                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandler = document.body.addEventListener('click', this.removeFake.bind(this));

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS;
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model;
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally;
                this.fakeElem.style.position = 'fixed';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically;
                this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = select(this.fakeElem);
            },

             //Only removes the fake element after another click event, that way
             //a user can hit `Ctrl+C` to copy because selection still exists.
            removeFake: function() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click');
                    this.fakeHandler = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            },

             //Executes the copy operation based on the current selection.
            copyText: function() {
                var succeeded;
                try {
                    succeeded = document.execCommand('copy');
                } catch (err) {
                    succeeded = false;
                }
                //this.handleResult(succeeded)
            },

            copy: function () {
                this.selectFake(this.text);
                this.copyText();
            }
        }
    });
});
