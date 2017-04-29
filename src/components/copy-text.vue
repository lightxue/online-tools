<template>
  <a href="#" @click.prevent="handle_click">{{ value }}</a>
</template>

<script>
import clipboard from '../util/clipboard.js'

export default {
  name: 'copy-button',

  props: {
    value: String,
  },

  methods: {
    handle_click: function() {
      if(clipboard.copy(this.value)) {
        this.$message.success('复制成功');
      }
      else {
        this.$message.error('复制失败');
      }
    },
  }
}
</script>

<style scoped>
  a, a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }
</style>


