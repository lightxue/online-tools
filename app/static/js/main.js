define(function (require) {
    var $ = require('jquery');
    require('bootstrap-treeview');

    var tree = [
        {
            text: '哈希函数',
            nodes: [
                {
                    text: 'MD5/SHA1',
                    href: '/encoding/hash'
                }
            ]
        },
        //{
            //text: '编码解码',
            //nodes: [
                //{
                    //text: 'Base64',
                //}, {
                    //text: 'URL'
                //}, {
                    //text: 'HTML'
                //}
            //]
        //},
        {
            text: '开发工具',
            nodes: [
                {
                    text: '正则测试',
                    href: '/develop/regex'
                }
            ]
        }
    ];

    var select_node = function (nodes) {
        for (var idx in nodes) {
            var node = nodes[idx];
            if (node.href === location.pathname) {
                // 设置当前node为选中状态
                node.state = {selected: true};
                break;
            }
            if ('nodes' in node) {
                select_node(node.nodes);
            }
        }
    }

    select_node(tree);

    var $tree = $('#treeview');
    $tree.treeview({
        data: tree,
        enableLinks: false,
    });

    $tree.on('nodeSelected', function(event, data) {
        window.open(data.href, '_self');
    })

    var get_mdl_path = function () {
        return location.pathname.substr(1);
    }

    // 加载对应模块js
    require([get_mdl_path()]);

});

