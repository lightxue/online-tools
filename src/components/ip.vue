<template>
  <main-frame id="ip">
    <h1 class="page-header">IP地址查询
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="ip-board">
      <copy-text :value="display_ip"></copy-text>
    </div>

    <div class="ip-input">
      <el-input v-model.trim="ip"
                :on-icon-click="search"
                @keyup.native.enter="search"
                icon="search"
                placeholder="请输入IP">
      </el-input>
    </div>

    <div class="output">
      <div class="panel ipinfo" v-loading=loading_ipinfo>
        <div class="caption" v-if="ipinfo">
          <a :href="'http://ipinfo.io/' + ipinfo.ip" target="_blank">IP Info</a>
          查询结果
        </div>
        <table v-if="ipinfo">
          <tbody>
            <tr>
              <td>Hostname</td>
              <td>{{ ipinfo.hostname }}</td>
            </tr>
            <tr>
              <td>Network</td>
              <td>
                <a :href="'http://ipinfo.io/' + ipinfo.as">{{ ipinfo.as }}</a>
                {{ ipinfo.org }}
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td v-if="!loading_ipinfo">
                  {{ ipinfo.area }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </main-frame>
</template>

<script>
import MainFrame from './main-frame.vue'
import ShareButton from './share-button.vue'
import CopyText from './copy-text.vue'
import util from '../util'

import axios from 'axios'

export default {
    name: 'ip',

    components: {
        MainFrame,
        ShareButton,
        CopyText,
    },

    data () {
        var params = util.qstr_2_obj();

        return {
            ip: params.ip ? params.ip : '',
            display_ip: '',
            loading_ipinfo: false,
            ipinfo: {},
        }
    },

    computed: {
        share_params: function() {
            if (!this.ip) {
                return {};
            }
            return {
                ip: this.ip
            };
        }
    },

    created: function() {
        this.get_ipinfo(this.ip);
    },

    methods: {
        search: function() {
            console.log('search');
            if (!/\d+\.\d+\.\d+\.\d+/.test(this.ip)) {
                this.$message({
                    message: 'IP地址格式错误',
                    type: 'error'
                });
                return ;
            }
            this.display_ip = this.ip;
            this.get_ipinfo(this.ip);
        },

        process_ipinfo: function(ipinfo) {
            if (ipinfo.bogon) {
                this.ipinfo = {};
                return ;
            }
            if (ipinfo.hasOwnProperty('org')) {
                var org = ipinfo.org.split(' ');
                ipinfo.network = ipinfo.org;
                ipinfo.as = org[0];
                ipinfo.org = org.slice(1).join(' ');
            }
            if (ipinfo.hasOwnProperty('city') &&
                ipinfo.hasOwnProperty('region') &&
                ipinfo.hasOwnProperty('country')) {
                ipinfo.area = [
                    ipinfo.city,
                    ipinfo.region,
                    ipinfo.country
                ].join(', ');
            }
            this.ipinfo = ipinfo;
        },

        get_ipinfo: function(ip) {
            var _this = this;
            this.loading_ipinfo = true;
            this.ipinfo = {};

            axios.get('http://ipinfo.io/' + ip)
                .then(function(rsp) {
                    var ip = rsp.data.ip;
                    if (!_this.display_ip && ip) {
                        _this.display_ip = rsp.data.ip;
                    }
                    if (_this.display_ip != ip) {
                        console.log('ipinfo not match with display ip');
                        console.log('ip --> ' + _this.display_ip);
                        return ;
                    }
                    _this.process_ipinfo(rsp.data);
                    _this.loading_ipinfo = false;
                })
                .catch(function(error) {
                    console.log(error);
                    _this.loading_ipinfo = false;
                    var msg = 'IP Info error';
                    if (error.response) {
                        msg += ': ' + error.response.status + ' --> ' +
                               error.response.data;
                    }
                    _this.$message({
                        showClose: true,
                        message: msg,
                        type: 'error'
                    });
                })
        }
    }
}
</script>

<style>

  .ip-board {
    text-align: center;
    font-size: 64px;
    padding: 40px 0px;
  }

  .panel {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }

  .panel .caption {
    font-size: 1.3em;
    font-weight: bold;
    margin: 10px 0px;
  }

  table {
    width: 100%;
    text-align: left;
    color: #4a4a4a;
    border-collapse: collapse;
  }

  tr {
    border-top: 1px solid #ddd;
  }

  tr:first-child {
    border-top: none;
  }

  td, th {
    line-height: 1.5;
    padding: 10px 5px;
  }

  th {
    opacity: 0.5;
    font-weight: normal;
  }

  .output {
    margin-top: 30px;
  }

</style>
