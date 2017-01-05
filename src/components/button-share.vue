<template>
  <a class="button-share el-icon-share" :href="link" @click.prevent="handle_click"></a>
</template>

<script>

import util from '../util'
import clipboard from '../util/clipboard.js'

export default {
  name: 'button-share',

  props: {
    url: String,
    params: Object,
  },

  computed: {
    link: function() {
      if (this.url) {
        return this.url;
      }
      else if (Object.keys(this.params).length > 0) {
        var qs = util.obj_2_qstr(this.params);
        return location.origin + location.pathname + '?' + qs;
      }
      else {
        return location.origin + location.pathname;
      }
    },
  },

  methods: {
    handle_click: function() {
      if(clipboard.copy(this.link)) {
        this.$message.success('分享链接已复制到剪贴板中');
      }
      else {
        this.$message.error('分享链接复制失败！');
      }
    }
  }
}
</script>

<style scoped>
.button-share {
  text-decoration: none;
  color: #000;
  font-size: 0.5em;
}
</style>

