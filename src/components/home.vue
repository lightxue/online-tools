<template>
  <main-frame>
    <h1 class="page-header">程序猿工具箱
    </h1>

    <div class="content">
      <p>
        实用程序猿工具，愿原力与你同在。
      </p>
      <p class="list">
        <template v-if="category.label"
                  v-for="category in tree">
          <h3 class="item category">
            {{ category.label }}
          </h3>
          <ul>
              <li v-if="node.label"
                  class="item node"
                  v-for="node in category.children">
                <router-link :to="{name: node.name}">
                  {{ node.label }}
                </router-link>
              </li>
          </ul>
        </template>
      </p>
    </div>
  </main-frame>
</template>

<script>
import MainFrame from './main-frame.vue'

export default {
  name: 'home',

  components: {
    MainFrame,
  },

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
  font-size: 20px;
}

.list .node {
  font-size: 18px;
  margin-top: 10px;
  list-style: none;
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
