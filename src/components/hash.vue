<template>
  <main-frame>
    <h1 class="page-header">MD5/SHA
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="input-group">
      <label for="text">待哈希字符串:</label>
      <el-input type="textarea"
                autofocus
                :autosize="{ minRows: 5}"
                v-model="text">
      </el-input>
    </div>

    <transition class="fade">
    <div v-if="is_hmac" id="key">
      <label for="key">key:</label>
      <el-input v-model="key"></el-input>
    </div>
    </transition>

    <div id="options">
      <el-checkbox v-model="is_upper">大写</el-checkbox>
      <el-checkbox v-model="is_beautify">分隔</el-checkbox>
      <el-checkbox v-model="is_hmac">HMAC</el-checkbox>
    </div>

    <div id="output">
      <copy-input readonly label="MD5:"  v-model="md5"/>
      <copy-input readonly label="SHA1:" v-model="sha1"/>
      <copy-input readonly label="SHA256:" v-model="sha256"/>
    </div>
  </main-frame>
</template>

<script>
import MD5 from 'blueimp-md5'
import jsSHA from 'jssha'

import MainFrame from './main-frame.vue'
import CopyInput from './copy-input.vue'
import ShareButton from './share-button.vue'
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

var sha = function (hash_type, text, key) {
  var sha = new jsSHA(hash_type, 'TEXT');

  if (key.length > 0) {
    sha.setHMACKey(key, 'TEXT');
    sha.update(text);
    return sha.getHMAC('HEX');
  }
  else {
    sha.update(text);
    return sha.getHash('HEX');
  }
}

export default {
  name: 'hash',

  components: {
    MainFrame,
    CopyInput,
    ShareButton,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      is_upper: params.is_upper === 'true',
      is_beautify: params.is_beautify === 'true',
      is_hmac: params.is_hmac === 'true',
      text: params.text ? params.text : '',
      key: params.key ? params.key : '',
    }
  },

  computed: {
    md5: function() {
      var md5 = MD5(this.text, this.is_hmac ? this.key : '');
      md5 = this.upper(md5);
      md5 = this.beautify(md5, [8, 4, 4, 4, 12]);
      return md5;
    },

    sha1: function() {
      var sha1 = sha('SHA-1', this.text, this.is_hmac ? this.key: '');
      sha1 = this.upper(sha1);
      sha1 = this.beautify(sha1, [8, 4, 4, 4, 4, 4, 12]);
      return sha1;
    },

    sha256: function() {
      var sha256 = sha('SHA-256', this.text, this.is_hmac ? this.key: '');
      sha256 = this.upper(sha256);
      sha256 = this.beautify(sha256, [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12]);
      return sha256;
    },

    share_params: function() {
        if (!this.text) {
          return {};
        }
        return this.$data;
    }
  },

  methods: {
    upper: function(text) {
      if (this.is_upper) {
        return text.toUpperCase();
      }
      return text;
    },

    beautify: function(text, fmt_seg) {
      if (this.is_beautify) {
        return beautify(text, fmt_seg);
      }
      return text;
    }
  }
}
</script>

<style scoped>
#key {
  margin-top: 10px;
  margin-bottom: 10px;
}

#output {
  margin-top: 40px;
}
</style>
