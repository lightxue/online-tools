<template>
  <div>
    <h1 class="page-header">URL编解码
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="input-group" :class="{'error-input': !is_valid}">
      <label for="text">输入字符串:</label>
      <el-input type="textarea"
                autofocus
                :autosize="{ minRows: 8}"
                v-model="input">
      </el-input>
    </div>

    <div id="options">
      <span class="option">
        <el-switch v-model="is_enc"
                   on-color="#20A0FF"
                   off-color="#20A0FF"
                   on-text="编码"
                   off-text="解码">
        </el-switch>
      </span>
    </div>

    <div id="output">
      <label for="text">输出字符串:</label>
      <el-input type="textarea"
                readonly
                :autosize="{ minRows: 8}"
                v-model="output">
      </el-input>
      <div class="copy">
        <copy-button :value="output" type="primary">复制结果</copy-button>
      </div>
    </div>
  </div>
</template>

<script>
import ShareButton from './share-button.vue'
import CopyButton from './copy-button.vue'
import util from '../util'

export default {
  name: 'url_codec',

  components: {
    ShareButton,
    CopyButton,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      is_enc: !(params.is_enc === 'false'),
      input: params.input ? params.input : '',
      is_valid: true,
    }
  },

  computed: {
    output: function() {
      if (!this.input) {
        this.is_valid = true;
        return '';
      }
      var coding = this.is_enc ? encodeURIComponent : decodeURIComponent;
      try {
        this.is_valid = true;
        return coding(this.input);
      }
      catch (err) {
        this.is_valid = false;
        return '';
      }
    },

    share_params: function() {
        if (!this.input) {
          return {};
        }
        return this.$data;
    }
  },

  methods: {
  }
}
</script>

<style scoped>
#output .copy {
  margin-top: 10px;
}
</style>
