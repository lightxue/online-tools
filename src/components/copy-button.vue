<template>
  <el-button @click="copy" :type="type">
    <slot>复制</slot>
  </el-button>
</template>

<script>
import clipboard from '../util/clipboard.js'

export default {
  name: 'copy-button',

  props: {
    value: String,
    type: String,
  },

  methods: {
    copy: function() {
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
</style>

