define(function (require) {
    var $ = require('jquery');
    require('bootstrap-treeview');

    var tree = [
        {
            text: '哈希函数',
            nodes: [
                {
                    text: 'MD5/SHA1',
                    href: '/hash/md5-sha1'
                }
            ]
        },
        {
            text: '编码解码',
            nodes: [
                {
                    text: 'Base64',
                }, {
                    text: 'URL'
                }, {
                    text: 'HTML'
                }
            ]
        }
    ];

    var select_node = function (nodes) {
        for (var idx in nodes) {
            var node = nodes[idx];
            if (node.href === location.pathname) {
                node.state = {selected: true};
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

    require('encoding/hash')

});

