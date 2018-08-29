<template>
  <main-frame>
    <h1 class="page-header"> {{ title }}
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="input-group" :class="{'error-input': !is_valid}">
      <label for="text">{{ is_enc ? '原始' : '编码' }}字符串:</label>
      <el-input type="textarea"
                @change="handle_change"
                autofocus
                :autosize="{ minRows: 8}"
                v-model="input">
      </el-input>
    </div>

    <div id="options">
      <span class="option">
        <el-button :type="active_button(is_enc)"  @click="handle_switch(true)" >编码</el-button>
        <el-button :type="active_button(!is_enc)" @click="handle_switch(false)">解码</el-button>
      </span>
    </div>

    <div id="output">
      <label for="text">{{ is_enc ? '编码' : '原始' }}字符串:</label>
      <el-input type="textarea"
                readonly
                :autosize="{ minRows: 8}"
                v-model="output">
      </el-input>
      <div class="copy">
        <copy-button :value="output" type="primary">复制</copy-button>
      </div>
    </div>
  </main-frame>
</template>

<script>
import MainFrame from './main-frame.vue'
import ShareButton from './share-button.vue'
import CopyButton from './copy-button.vue'
import util from '../util'

export default {
  name: 'codec',

  components: {
    MainFrame,
    ShareButton,
    CopyButton,
  },

  props: {
    title: String,
  },

  data () {
    var params = util.get_recovery(this.$route.name, this.$route.query)

    return {
      is_enc: params.is_enc === 'true',
      input: params.input ? params.input : '',
      is_valid: true,
      output: '',
    }
  },

  computed: {
    share_params: function() {
      var data = {
        input: this.input,
        is_enc: this.is_enc
      };
      data = this.input ? data : {};
      util.set_local_storage(this.$route.name, data);
      return data;
    },
  },

  mounted: function() {
    this.handle_change();
  },

  methods: {
    handle_change: function() {
      this.$emit('change');
    },

    handle_switch: function(is_enc) {
      this.is_enc = is_enc;
      this.handle_change();
    },

    encode: function(enc_func) {
      if (!this.input) {
        this.is_valid = true;
        this.output = '';
        return ;
      }

      try {
        this.is_valid = true;
        this.output = enc_func(this.input);
      }
      catch (err) {
        console.log('encode/decode error');
        console.log(err);
        this.is_valid = false;
        this.output = '';
      }
    },

    active_button: function(flag) {
      if (flag) {
        return 'primary';
      }
      return '';
    }
  },
}
</script>

<style scoped>
#output .copy {
  margin-top: 10px;
}
</style>
