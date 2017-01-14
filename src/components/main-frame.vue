<template>
  <div class="main-frame">
    <el-row>
      <el-col :span="10" :offset="4">
        <slot></slot>
      </el-col>

      <el-col :span="4" :offset="2">
        <tree-view></tree-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeView from './tree-view.vue'

export default {
  name: 'main-frame',

  components: {
    TreeView
  },

  data () {
    return {
    }
  },

  methods: {
  },
}
</script>
