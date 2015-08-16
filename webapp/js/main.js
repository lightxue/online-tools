define(function (require) {
    // 公共模块
    require('jquery');
    require('bootstrap');
    require('director');

    // 自定义模块
    require('js/common/route').init();

});
