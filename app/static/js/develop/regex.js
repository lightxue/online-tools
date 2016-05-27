define(function (require) {
    var $ = require('jquery');
    var Vue = require('vue');
    var util = require('util/common');
    var btn_copy = require('util/btn-copy');
    var btn_share = require('util/btn-share');

    var start_tag = '____light-begin-tag--impossible-match____';
    var end_tag = '____light-end-tag--impossible-match___';
    var params = util.qstr_2_obj();
    var vue_data = {
      re: params.re ? params.re : '',
      text: params.text ? params.text : '',
      is_ig: params.is_ig === 'true',
      link: '#'
    };

    var $result = $('#match-result');

    var vue = new Vue({
        el: '#tool',
        data: vue_data,
        methods: {
            change: function (event) {
                var ig = this.is_ig ? 'i' : '';
                console.log(this.is_ig);
                var regex = new RegExp(this.re, 'g' + ig);
                var result = this.text.replace(regex,  start_tag + '$&' + end_tag);
                result = util.html_enc(result);
                result = result.split(' ').join('&nbsp;')
                               .split('\n').join('<br>')
                               .split(start_tag).join('<span class="match">')
                               .split(end_tag).join('</span>');
                $result.html(result);
                this.update_link();
            },

            update_link: function() {
                var qs = util.obj_2_qstr({
                    re: this.re,
                    text: this.text,
                    is_ig: this.is_ig
                });
                if (this.re) {
                    var link = location.origin + location.pathname + '?' + qs;
                }
                else {
                    var link = location.origin + location.pathname;
                }
                this.link = link;
            },

            init: function () {
              if (this.text) {
                this.change();
              }
              this.update_link();
            }
        }
    });

    vue.$nextTick(function () {
        vue.init();
    });
});
