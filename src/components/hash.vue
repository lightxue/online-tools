<template>
  <div>
    <h1 class="page-header">常用哈希
      <button-share :params="share_params"></button-share>
    </h1>

    <div class="input-group">
      <label for="text">待哈希字符串:</label>
      <el-input type="textarea"
                autofocus
                :autosize="{ minRows: 5}"
                v-model="text"
                @change="change">
      </el-input>
    </div>

    <transition class="fade">
    <div v-if="is_hmac" id="key">
      <label for="key">key:</label>
      <el-input v-model="key" @change="change"></el-input>
    </div>
    </transition>

    <div id="options">
      <el-checkbox v-model="is_upper" @change="change">大写</el-checkbox>
      <el-checkbox v-model="is_beautify" @change="change">分隔</el-checkbox>
      <el-checkbox v-model="is_hmac" @change="change">HMAC</el-checkbox>
    </div>

    <div id="output">
      <copy-input label="MD5:"  :text="md5"/>
      <copy-input label="SHA1:" :text="sha1"/>
      <copy-input label="SHA256:" :text="sha256"/>
    </div>
  </div>
</template>

<script>
import MD5 from 'blueimp-md5'
import jsSHA from 'jssha'

import CopyInput from './copy-input.vue'
import ButtonShare from './button-share.vue'
import util from '../util'

var beautify = function(text, fmt_seg) {
  var res = [], start = 0;
  for (var i = 0; i < fmt_seg.length; ++i) {
    var len = fmt_seg[i];
    res.push(text.substr(start, len));
    start += len;
  }
  return res.join('-');
}

export default {
  name: 'hash',

  components: {
    CopyInput,
    ButtonShare,
  },


  data () {
    var params = util.qstr_2_obj();

    return {
      is_upper: params.is_upper === 'true',
      is_beautify: params.is_beautify === 'true',
      is_hmac: params.is_hmac === 'true',
      text: params.text ? params.text : '',
      key: params.key ? params.key : '',
      md5: '',
      sha1: '',
      sha256: '',
    }
  },

  computed: {
    share_params: function() {
        if (!this.text) {
          return {};
        }
        return {
          text: this.text,
          key: this.key,
          is_upper: this.is_upper,
          is_beautify: this.is_beautify,
          is_hmac: this.is_hmac,
        }
    }
  },

  created: function() {
    if (this.text) {
      this.change();
    }
  },

  methods: {
    change: function () {
        this.update_md5();
        this.update_sha1();
        this.update_sha256();
    },

    update_md5: function () {
      var md5 = MD5(this.text, this.is_hmac ? this.key : '');
      if (this.is_upper) {
        md5 = md5.toUpperCase();
      }
      if (this.is_beautify) {
        md5 = beautify(md5, [8, 4, 4, 4, 12]);
      }
      this.md5 = md5;
    },

    update_sha1: function () {
      var sha1;
      var sha = new jsSHA('SHA-1', 'TEXT');

      if (this.is_hmac && this.key.length > 0) {
        sha.setHMACKey(this.key, 'TEXT');
        sha.update(this.text);
        sha1 = sha.getHMAC('HEX');
      }
      else {
        sha.update(this.text);
        sha1 = sha.getHash('HEX');
      }
      if (this.is_upper) {
        sha1 = sha1.toUpperCase();
      }
      if (this.is_beautify) {
        sha1 = beautify(sha1, [8, 4, 4, 4, 4, 4, 12]);
      }
      this.sha1 = sha1;
    },

    update_sha256: function () {
      var sha256;
      var sha = new jsSHA('SHA-256', 'TEXT');

      if (this.is_hmac && this.key.length > 0) {
        sha.setHMACKey(this.key, 'TEXT');
        sha.update(this.text);
        sha256 = sha.getHMAC('HEX');
      }
      else {
        sha.update(this.text);
        sha256 = sha.getHash('HEX');
      }
      if (this.is_upper) {
        sha256 = sha256.toUpperCase();
      }
      if (this.is_beautify) {
        sha256 = beautify(sha256, [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12]);
      }
      this.sha256 = sha256;
    },
  }
}
</script>

<style scoped>
.input-group {
  margin-top: 20px;
}

#options {
  margin-top: 10px;
}

#key {
  margin-top: 10px;
  margin-bottom: 10px;
}

#output {
  margin-top: 40px;
}
</style>
