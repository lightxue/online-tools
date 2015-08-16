define(function (require) {
    var Router = require('director');
    var $ = require('jquery');
    $subview = $('#toolkit-sub-view');

    return {
        init: init,
    }

    function init() {
        var cur_mdl = null;

        var cfg = {

            '/:subview/:content': function(subview, content) {
                if (cur_mdl && cur_mdl.onViewClose) {
                    cur_mdl.onViewClose();
                }
                cur_mdl = null;

                $subview.html('');

                $.get(subview + '/sidebar.html', null, function (sidebar_html) {
                    $.get(subview + '/' + content + '.html', null, function(content_html) {
                        $subview.html(sidebar_html + content_html);

                        // html对应的js文件必须文件名相同，且放在/js目录下
                        // 模块如果有process函数，会执行
                        // 如果有onviewclose函数，在切换view时会执行
                        require(['js/' + subview + '/' + content], function(mdl) {
                            cur_mdl = mdl;
                            if (mdl.process) {
                                mdl.process();
                            }
                        });
                        active_side_bar(subview, content);
                    });

                });
                active_nav_bar(subview);
            },

            '/:subview': function (subview) {
                if (cur_mdl && cur_mdl.onViewClose) {
                    cur_mdl.onViewClose();
                }
                cur_mdl = null;

                $subview.html('');

                $.get(subview + '.html', null, function (data) {

                    $subview.html(data);

                    // html对应的js文件必须文件名相同，且放在/js目录下
                    // 模块如果有process函数，会执行
                    // 如果有onviewclose函数，在切换view时会执行
                    require(['js/' + subview], function(mdl) {
                        cur_mdl = mdl;
                        if (mdl.process) {
                            mdl.process();
                        }
                    });
                });
                active_nav_bar(subview);
            }
        }

        router = Router(cfg);
        router.init();
    }

    function active_nav_bar(subview) {
        // 导航栏id的名字必须要和subview对应
        var nav_id = '#toolkit-nav-' + subview;
        $nav = $('#toolkit-navbar');
        $nav.find('.active').removeClass('active');
        $nav.find(nav_id).addClass('active');
    }

    function active_side_bar(subview, content) {
        // 导航栏id的名字必须要和subview对应
        var nav_id = '#toolkit-sidebar-' + subview + '-' + content;
        $sidebar = $('#toolkit-sidebar');
        $sidebar.find('.active').removeClass('active');
        $sidebar.find(nav_id).addClass('active');
    }
});
