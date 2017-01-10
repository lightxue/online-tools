<template>
  <div id="tree-view">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header" class="title">
        <router-link to="/">Geek工具箱</router-link>
      </div>
      <div class="body">
        <template v-if="category.label"
                  v-for="category in tree">
          <div class="item category">
            {{ category.label }}
          </div>
          <router-link v-if="node.label"
                       class="item node"
                       v-for="node in category.children"
                       :to="{name: node.name}">
            {{ node.label }}
          </router-link>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'tree-view',

  data () {
    return {
      tree: this.$router.options.routes,
    }
  },

  methods: {
  }
}
</script>

<style scoped>
#tree-view {
  //position: fixed;
  //top: 51px;
  //bottom: 0;
  margin-top: 50px;
  width: 210px;
  z-index: 1000;
  display: block;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

#tree-view .title {
  font-weight: bold;
  text-align: center;
}

#tree-view .item {
  color: #333;
  padding: 10px 15px;
}

#tree-view .category {
  font-weight: bold;
  background-color: #eff2f7;
}

#tree-view .node {
  text-indent: 2em;
}

#tree-view .node:hover {
  color: #333;
  background-color: #e5e9f2;
}

#tree-view .item.router-link-active {
  color: #fff;
  background-color: #20a0ff;
}

#tree-view a {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
