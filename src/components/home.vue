<template>
  <div>
    <h1 class="page-header">程序猿工具箱
    </h1>

    <div class="content">
      <p>
        在线程序猿工具箱，愿原力与你同在。
      </p>
    </div>

    <div class="list">
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
  </div>
</template>

<script>
export default {
  name: 'home',

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
.content {
  margin-top: 40px;
  text-indent: 2em;
  font-size: 18px;
}

.list {
  margin-top: 30px;
}

.list .category {
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 19px;
}

.list .node {
  font-size: 18px;
  text-indent: 2em;
  display: block;
  margin-top: 8px;
}

.list a {
  text-decoration: none;
}
.list a { color: #20A0FF; }
.list a:visited { color: #20A0FF; }
.list a:hover { color: #20A0FF; }
.list a:active { color: #20A0FF; }

.ascii-art {
  font-size: 10px;
  font-family: Inconsolata, Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace ;
}
</style>
