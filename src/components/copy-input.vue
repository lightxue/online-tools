<template>
  <div class="copy-input-group">
    <label>{{ label }}</label>
      <el-input v-model="text" readonly>
        <el-button slot="append" @click="copy(text)">复制</el-button>
      </el-input>
  </div>
</template>

<script>
import clipboard from '../util/clipboard.js'

export default {
  name: 'copy-input',

  props: {
    text: String,
    label: String,
  },

  methods: {
    copy: function(text) {
      if(clipboard.copy(text)) {
        this.$message.success('"' + text + '" 已复制到剪贴板中');
      }
      else {
        this.$message.error('"' + text + '" 复制失败！');
      }
    },

  }
}
</script>

<style scoped>
.copy-input-group {
  margin-top: 20px;
}
</style>

