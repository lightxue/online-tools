import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hash from '../components//hash.vue'
import URLCodec from '../components//url-codec.vue'
import Regex from '../components/regex.vue'
import TreeView from '../components/tree-view.vue'
import Dummy from '../components/dummy-route-view.vue'
import NotFound from '../components/404.vue'

export default new Router({
    mode: 'history',
    routes: [
        {
            label: '编码解码',
            path: '/encoding',
            component: Dummy,
            children: [
                {
                    name: 'hash',
                    label: '常用哈希',
                    path: 'hash',
                    component: Hash
                },
                {
                    name: 'url_codec',
                    label: 'URL编解码',
                    path: 'url-codec',
                    component: URLCodec
                }
            ]
        }, {
            label: '开发工具',
            path: '/develop',
            component: Dummy,
            children: [
                {
                    name: 'regex',
                    label: '正则测试',
                    path: 'regex',
                    component: Regex
                }
            ]
        }, {
            path: '/',
            redirect: '/encoding/hash'
        }, {
            path: '/404',
            component: NotFound
        }, {
            path: '*',
            redirect: '/404'
        }
    ],
})
