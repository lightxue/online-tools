<template>
  <a class="button-share el-icon-share" :href="link"></a>
</template>

<script>

import util from '../util'

export default {
  name: 'button-share',

  props: {
    url: String,
    params: Object,
  },

  computed: {
    link: function() {
      if (this.url) {
        return this.url;
      }
      else if (Object.keys(this.params).length > 0) {
        var qs = util.obj_2_qstr(this.params);
        return location.origin + location.pathname + '?' + qs;
      }
      else {
        return location.origin + location.pathname;
      }
    },
  },

  methods: {
  }
}
</script>

<style scoped>
.button-share {
  text-decoration: none;
  color: #000;
  font-size: 0.5em;
}
</style>

