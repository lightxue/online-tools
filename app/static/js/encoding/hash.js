define(function (require) {
    var Vue = require('vue');
    var MD5 = require('md5');
    var jsSHA = require('jsSHA');
    var util = require('util/common');
    var btn_copy = require('util/btn-copy');
    var btn_share = require('util/btn-share');

    var format_md5 = function (md5) {
        // 8-4-4-4-12
        md5 = md5.substr(0, 8) + '-' +
              md5.substr(8, 4) + '-' +
              md5.substr(12, 4) + '-' +
              md5.substr(16, 4) + '-' +
              md5.substr(20, 12);
        return md5;
    }

    var format_sha1 = function (sha1) {
        // 8-4-4-4-4-4-12
        sha1 = sha1.substr(0, 8) + '-' +
               sha1.substr(8, 4) + '-' +
               sha1.substr(12, 4) + '-' +
               sha1.substr(16, 4) + '-' +
               sha1.substr(20, 4) + '-' +
               sha1.substr(24, 4) + '-' +
               sha1.substr(28, 12);
        return sha1;
    }

    var params = util.qstr_2_obj();
    var vue_data = {
      text: params.text ? params.text : '',
      md5: '',
      key: params.key ? params.key : '',
      sha1: '',
      is_upper: params.is_upper === 'true',
      is_beautify: params.is_beautify === 'true',
      is_hmac: params.is_hmac === 'true',
      link: '#'
    };

    var vue = new Vue({
        el: '#tool',
        data: vue_data,
        methods: {
            change: function (event) {
                this.update_md5();
                this.update_sha1();
                this.update_link();
            },

            update_md5: function () {
                var md5 = MD5(this.text, this.is_hmac ? this.key : '');
                if (this.is_upper) {
                    md5 = md5.toUpperCase();
                }
                if (this.is_beautify) {
                    md5 = format_md5(md5);
                }
                this.md5 = md5;
            },

            update_sha1: function () {
                var sha1;
                var sha = new jsSHA('SHA-1', 'TEXT');

                if (this.is_hmac && this.key.length > 0) {
                    sha.setHMACKey(this.key, 'TEXT');
                    sha.update(this.text);
                    sha1 = sha.getHMAC('HEX');
                }
                else {
                    sha.update(this.text);
                    sha1 = sha.getHash('HEX');
                }
                if (this.is_upper) {
                    sha1 = sha1.toUpperCase();
                }
                if (this.is_beautify) {
                    sha1 = format_sha1(sha1);
                }
                this.sha1 = sha1;
            },

            update_link: function() {
                var qs = util.obj_2_qstr({
                    text: this.text,
                    is_upper: this.is_upper,
                    is_beautify: this.is_beautify,
                    is_hmac: this.is_hmac
                });
                if (this.text) {
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

    vue.init();
});
