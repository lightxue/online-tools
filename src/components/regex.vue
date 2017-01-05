<template>
  <div id="regex">
    <h1 class="page-header">正则测试
      <button-share :params="share_params"></button-share>
    </h1>

    <copy-input label="正则表达式:"
                v-model="re"/>

    <div class="input-group">
      <label for="text">匹配的字符串:</label>
      <el-input type="textarea"
                autofocus
                :autosize="{ minRows: 5}"
                v-model="text">
      </el-input>
    </div>

    <div id="options">
      <el-checkbox v-model="is_ig">忽略大小写</el-checkbox>
    </div>

    <div class="output">
      <label>匹配结果:</label>
      <div id="result" v-html="output">
      <div>
    </div>

  </div>
</template>

<script>
import CopyInput from './copy-input.vue'
import ButtonShare from './button-share.vue'
import util from '../util'

export default {
  name: 'regex',

  components: {
    CopyInput,
    ButtonShare,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      re: params.re ? params.re : '',
      text: params.text ? params.text: '',
      is_ig: params.is_ig === 'true',
    }
  },

  computed: {
    output: function() {
      if (!this.re) {
        return util.html_enc(this.text);
      }

      var start_stub = '____light-begin-stub--impossible-match____';
      var end_stub = '____light-end-stub--impossible-match___';

      var ig = this.is_ig ? 'i' : '';
      var regex = new RegExp(this.re, 'g' + ig);
      var result = this.text.replace(regex,  start_stub + '$&' + end_stub);
      result = util.html_enc(result);
      result = result.replace(/ /g, '&nbsp;')
                     .replace(/\n/g, '<br>')
                     .replace(RegExp(start_stub, 'g'), '<span class="match">')
                     .replace(RegExp(end_stub, 'g'), '</span>');
      return result;
    },

    share_params: function() {
        if (!this.text && !this.re) {
          return {};
        }
        return this.$data;
    }
  },

  methods: {
  }
}
</script>

<style>
#regex .output {
  font-size: 18px;
  margin-top: 20px;
  border: 1px;
}

#regex #result {
  margin-top: 10px;
}

#regex .output .match {
  font-size: 1.1em;
  background-color: #FFFF00;
  border: 1px solid #ddd;
  -webkit-border-radius: 0.3em;
  -moz-border-radius: 0.3em;
  -ms-border-radius: 0.3em;
  -o-border-radius: 0.3em;
  border-radius: 0.3em;
  padding: 0 .05em;
  margin: 1px .01em;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
