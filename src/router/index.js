import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/home.vue'
import Hash from '../components/hash.vue'
import URLCodec from '../components/url-codec.vue'
import HTMLCodec from '../components/html-codec.vue'
import UTF8Codec from '../components/utf8-codec.vue'
import Base64 from '../components/base64.vue'
import QRCode from '../components/qrcode.vue'
import Regex from '../components/regex.vue'
import TimeConverter from '../components/time-converter.vue'
import JsonFormatter from '../components/json-formatter.vue'
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
                    label: 'MD5/SHA',
                    path: 'hash',
                    component: Hash
                },
                {
                    name: 'url_codec',
                    label: 'URL',
                    path: 'url-codec',
                    component: URLCodec
                },
                {
                    name: 'html_codec',
                    label: 'HTML',
                    path: 'html-codec',
                    component: HTMLCodec
                },
                {
                    name: 'utf8_codec',
                    label: 'UTF-8',
                    path: 'utf8-codec',
                    component: UTF8Codec
                },
                {
                    name: 'base64',
                    label: 'Base64',
                    path: 'base64',
                    component: Base64
                },
                {
                    name: 'qrcode',
                    label: '二维码',
                    path: 'qrcode',
                    component: QRCode
                },
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
                },
                {
                    name: 'time_converter',
                    label: '时间转换',
                    path: 'time-converter',
                    component: TimeConverter
                },
            ]
        }, {
            label: '格式化',
            path: '/formatter',
            component: Dummy,
            children: [
                {
                    name: 'json_formatter',
                    label: 'JSON',
                    path: 'json',
                    component: JsonFormatter
                },
            ]
        }, {
            path: '/',
            name: 'home',
            component: Home,
        }, {
            path: '/404',
            name: 'not_found',
            component: NotFound
        }, {
            path: '*',
            redirect: '/404'
        },
    ],
})
