define(function (require) {
    var $ = require('jquery');
    var Clipboard = require('clipboard');
    var Vue = require('vue');

    var init = function () {
        new Clipboard('.btn-copy');

        var $copy_btn = $('.btn-copy');
        $copy_btn.tooltip('hide');
        $copy_btn.on('mouseout', function () {
            $(this).tooltip('hide');
        })
        $copy_btn.on('click', function () {
            $(this).tooltip('show');
        })
    }

    Vue.component('button-copy', {
        props: ['target'],
        template: '\
            <button class="btn btn-default btn-copy"/\
              data-clipboard-target="{{ target }}"/\
              data-toggle="tooltip"/\
              data-trigger="manual"/\
              title="已复制">复制</button>'
    });

    Vue.nextTick(init);

});
