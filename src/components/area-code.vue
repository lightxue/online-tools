<template>
  <main-frame id="area-code">
    <h1 class="page-header">行政编码查询
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="area-input">
      <el-input autofocus
                placeholder="请输入区号或地名"
                v-model.trim="input">
      </el-input>
    </div>

    <div class="output">
      <div v-for="(item, index) in output">
          <div class="code">
            <copy-tag :value="item.code">
              <hl-keyword :value="item.code" :kw="input">
              </hl-keyword>
            </copy-tag>
          </div>

          <div class="area">
            <span class="name" v-if="item.province">
              <copy-tag :value="item.province.name">
                <hl-keyword :value="item.province.name" :kw="input"></hl-keyword>
              </copy-tag>
            </span>
            <span class="name" v-if="item.city">
              <copy-tag :value="item.city.name">
                <hl-keyword :value="item.city.name" :kw="input"></hl-keyword>
              </copy-tag>
            </span>
            <span class="name" v-if="item.county">
              <copy-tag :value="item.county.name">
                <hl-keyword :value="item.county.name" :kw="input"></hl-keyword>
              </copy-tag>
            </span>
          </div>
      </div>
    </div>
  </main-frame>
</template>

<script>
import MainFrame from './main-frame.vue'
import ShareButton from './share-button.vue'
import CopyText from './copy-text.vue'
import CopyTag from './copy-tag.vue'
import HlKeyword from './hl-keyword.vue'
import util from '../util'
import codes from 'assets/area-code.json'


export default {
    name: 'area_code',

    components: {
        MainFrame,
        ShareButton,
        CopyText,
        CopyTag,
        HlKeyword,
    },

    data () {
        var params = util.get_recovery(this.$route.name, this.$route.query)

        return {
            input: params.input ? params.input : '',
            page_size: 20,
        }
    },

    computed: {
        share_params: function() {
            var data = this.input ? { input: this.input } : {};
            util.set_local_storage(this.$route.name, data);
            return data;
        },
        output: function() {
            let res_codes = [], res = []
            const that = this
            if (!this.input) {
            }
            else if (util.is_num(this.input)) {
                res_codes = this.search_code(this.input)
            }
            else {
                res_codes = this.search_name(this.input)
            }
            res_codes.sort()
            res_codes = res_codes.slice(0, this.page_size)
            res_codes.forEach(function(code, i) {
                res.push(that.get_detail(code))
            })
            return res
        }
    },

    created: function() {
    },

    methods: {
        search_code: function(code) {
            let res = []
            Object.keys(codes).forEach(function(key, i) {
                if (key.startsWith(code)) {
                    res.push(key)
                }
            })
            return res
        },

        search_name: function(text) {
            const that = this
            let res = []
            Object.keys(codes).forEach(function(key, i) {
                if (that.match(text, codes[key])) {
                    res.push(key)
                }
            })
            return res
        },

        match: function(key, s) {
            return s.indexOf(key) !== -1
        },

        get_detail: function(code) {
            let res = {}
            let province = code.slice(0, 2) + '0000'
            let city = code.slice(0, 4) + '00'
            res.code = code

            const add = (code_, type) => {
                let added = false
                Object.values(res).forEach((v, i) => {
                    if (v.code === code_) {
                        added = true
                    }
                })
                if (added || !codes[code_]) {
                    return
                }
                res[type] = {
                    code: code_,
                    name: codes[code_]
                }
            }

            add(province, 'province')
            add(city, 'city')
            add(code, 'county')

            return res
        }
    }
}
</script>

<style>

  .output {
    margin-top: 30px;
  }

  .output .code {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 5px;
  }

  .output .area {
    display: inline-block;
  }

  .output .area .name:after {
    content: " \2192 ";
  }

  .output .area .name:last-child:after {
    content: "";
  }
</style>
