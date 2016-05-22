define(function (require) {
    function queryStr2Obj() {
        var pairs = location.search.slice(1).split('&');

        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });

        return result;
    }

    function obj2QueryStr(obj) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

    return {
        queryStr2Obj: queryStr2Obj,
        obj2QueryStr: obj2QueryStr
    }
});
