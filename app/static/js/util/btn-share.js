define(function (require) {
    var $ = require('jquery');
    var Vue = require('vue');

    var $btn;

    Vue.component('button-share', {
        props: ['link'],
        template: '\
            <a class="permalink btn-share" href="{{ link }}">\
              <span class="glyphicon glyphicon-share"\
                aria-hidden="true"></span>\
            </a>'
    });

});

