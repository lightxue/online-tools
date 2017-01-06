<template>
  <div id="app">
    <el-row>
      <el-col :span="10" :offset="4">
        <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
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

<style>
body {
  font-size: 16px;
}

.page-header .permalink {
  font-size: 14px;
  color: rgb(51, 51, 51);
}

.code {
  font-family: Monaco, Inconsolata, Menlo, 'Andale Mono', 'lucida console', 'Courier New';
}

label {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-size: 16px;
  font-weight: 7000;
}

.input-group {
  margin-top: 20px;
}

.error-input input:hover, .error-input textarea:hover {
  border-color: #FF4949;
}

.error-input input:focus, .error-input textarea:focus {
  border-color: #FF4949;
}

.error-input input, .error-input textarea {
  border-color: #FF4949;
}

#options {
  margin-top: 10px;
}

#options .option+.option {
  margin-left: 30px;
}
</style>
