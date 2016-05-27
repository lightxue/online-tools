define(function (require) {
    var $ = require('jquery');

    function qstr_2_obj() {
        var pairs = location.search.slice(1).split('&');

        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });

        return result;
    }

    function obj_2_qstr(obj) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

    function html_dec(s) {
      return $("<div/>").html(s).text();
    }

    function html_enc(s) {
      return $("<div/>").text(s).html();
    }

    return {
        qstr_2_obj: qstr_2_obj,
        obj_2_qstr: obj_2_qstr,
        html_enc: html_enc,
        html_dec: html_dec
    }
});
