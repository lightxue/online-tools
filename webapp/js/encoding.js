define(function (require) {
    var $ = require('jquery');
    var Router = require('director');

    return {
        process: process,
    }

    function process() {
        window.location.href = "/#/encoding/hash";
    }
});
