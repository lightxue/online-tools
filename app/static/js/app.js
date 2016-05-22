requirejs.config({
    baseUrl: '/static/js/',
    paths: {
        jquery: '/static/lib/jquery/2.1.4/jquery.min',
        bootstrap: '/static/lib/bootstrap/3.3.5/js/bootstrap.min',
        'bootstrap-treeview': '/static/lib/bootstrap-treeview/1.2.0/bootstrap-treeview.min',
        vue: '/static/lib/vuejs/1.0.21/vue.min',
        moment: '/static/lib/moment/2.10.6/moment-with-locales.min',
        md5: '/static/lib/md5/2.3.0/md5.min',
        jsSHA: '/static/lib/jsSHA/2.1.0/sha',
        clipboard: '/static/lib/clipboard/1.5.10/clipboard.min',
    },

    shim : {
        bootstrap : { 'deps' :['jquery'] },
        'bootstrap-treeview': {
            'deps': ['jquery', 'bootstrap'],
            exports: '$.fn.treeview'
        }
    },
});

requirejs(['jquery', 'bootstrap', 'main']);

