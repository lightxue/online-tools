<template>
  <a class="share-button el-icon-share" :href="link" @click.prevent="handle_click"></a>
</template>

<script>

import util from '../util'
import clipboard from '../util/clipboard.js'

export default {
  name: 'share-button',

  props: {
    url: String,
    params: Object,
  },

  computed: {
    link: function() {
      if (this.url) {
        return this.url;
      }
      var path = location.origin + location.pathname + '#' + this.$route.path;
      if (Object.keys(this.params).length > 0) {
        var qs = util.obj_2_qstr(this.params);
        return path + '?' + qs;
      }
      else {
        return path;
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
.share-button {
  text-decoration: none;
  color: #000;
  font-size: 0.5em;
}
</style>

