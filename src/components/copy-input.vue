<template>
  <div class="copy-input-group">
    <label>{{ label }}</label>
      <el-input :value="value"
                :readonly="readonly"
                @input="handleInput">
        <el-button slot="append" @click="copy">复制</el-button>
      </el-input>
  </div>
</template>

<script>
import clipboard from '../util/clipboard.js'

export default {
  name: 'copy-input',

  props: {
    value: String,
    label: String,
    readonly: Boolean,
  },

  methods: {
    copy: function() {
      if(clipboard.copy(this.value)) {
        this.$message.success('"' + this.value + '" 已复制到剪贴板中');
      }
      else {
        this.$message.error('"' + this.value + '" 复制失败！');
      }
    },

    handleInput: function(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }

  }
}
</script>

<style scoped>
.copy-input-group {
  margin-top: 20px;
}
</style>

