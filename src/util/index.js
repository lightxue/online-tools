import he from 'he'
import {AllHtmlEntities as HtmlEntities} from 'html-entities'

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

function html_enc(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function html_dec(str){
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

function parse_num(str, default_value) {
    var n = Number(str);
    if (isNaN(n)) {
        return default_value;
    }
    else {
        return n;
    }
}

function hex_esc(str) {
    var length = str.length;
    var index = -1;
    var result = '';
    var hex;
    while (++index < length) {
        hex = str.charCodeAt(index).toString(16).toUpperCase();
        result += '\\x' + ('00' + hex).slice(-2);
    }
    return result;
}

function hex_unesc(str) {
    return eval('\'' + str + '\'');
}

export default {
    qstr_2_obj,
    obj_2_qstr,
    html_enc: HtmlEntities.encode,
    html_dec: HtmlEntities.decode,
    parse_num,
    hex_esc,
    hex_unesc,
}
