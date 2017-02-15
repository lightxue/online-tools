<template>
  <main-frame id="regex">
    <h1 class="page-header">正则测试
      <share-button :params="share_params"></share-button>
    </h1>

    <copy-input :class="{'error-input': !valid_re}"
                label="正则表达式:"
                autofocus
                v-model="re"/>

    <div id="options">
      <el-checkbox v-model="is_ig">忽略大小写</el-checkbox>
    </div>

    <div class="text">
      <label>测试字符串:</label>
      <div class="editable-div">
        <div class="show-area code" v-show="true" v-html="output" @click="editable = true">
        </div>
        <textarea class="edit-area code" v-show="editable" v-model="text" @blur="editable = false" v-focus="true" autosize>
        </textarea>
      </div>
    </div>

  </main-frame>
</template>

<script>
import { focus } from 'vue-focus';

import MainFrame from './main-frame.vue'
import CopyInput from './copy-input.vue'
import ShareButton from './share-button.vue'
import util from '../util'

export default {
  name: 'regex',

  components: {
    MainFrame,
    CopyInput,
    ShareButton,
  },

  directives: { focus: focus },

  data () {
    var params = util.qstr_2_obj();

    return {
      re: params.re ? params.re : '',
      text: params.text ? params.text: '',
      is_ig: params.is_ig === 'true',
      editable: false,
    }
  },

  computed: {
    valid_re: function() {
        try {
          var regex = new RegExp(this.re);
        }
        catch(err) {
          return false;
        }
        return true;
    },

    output: function() {
      if (!this.re || !this.valid_re) {
        return this.escape(this.text);
      }

      var start_stub = '____light-begin-stub--impossible-match____';
      var end_stub = '____light-end-stub--impossible-match___';

      var ig = this.is_ig ? 'i' : '';
      var regex = new RegExp(this.re, 'g' + ig);
      var matched = this.text.replace(regex,  start_stub + '$&' + end_stub);
      var html = this.escape(matched);
      html = html.replace(RegExp(start_stub, 'g'), '<span class="match">')
                 .replace(RegExp(end_stub, 'g'), '</span>');
      return html;
    },

    share_params: function() {
        if (!this.text && !this.re) {
          return {};
        }
        return this.$data;
    }
  },

  methods: {
    escape: function(text) {
      var html = util.html_enc(text);
      html = html.replace(/ /g, '&nbsp;')
                 .replace(/\n/g, '<br>');
      return html;
    }
  }
}
</script>

<style>
#regex .editable-div {
  position: relative;
}

#regex .show-area, .edit-area {
  box-sizing: border-box;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 300px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  font-size: 18px;
  line-height: 1;
  padding: 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  word-break: break-all;
  white-space: pre-wrap;
}

#regex .text .match {
  box-sizing: border-box;
  background-color: #F7BA2A;
  //border: 1px solid #ddd;
  -webkit-border-radius: 0.3em;
  -moz-border-radius: 0.3em;
  -ms-border-radius: 0.3em;
  -o-border-radius: 0.3em;
  border-radius: 0.3em;
  padding: 0 .05em;
  margin: 1px .01em;
}

</style>
