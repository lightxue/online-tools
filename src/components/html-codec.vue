<template>
  <div>
    <codec @change="handle_change"
           ref="codec"
           title="HTML编解码">
    </codec>
  </div>
</template>

<script>
import util from '../util'
import Codec from './codec.vue'

export default {
  name: 'html_codec',

  components: {
    Codec,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    handle_change: function() {
      var codec = this.$refs.codec;
      var func = codec.is_enc ? util.html_enc : util.html_dec;
      codec.encode(func);
    },
  }
}
</script>

<style scoped>
</style>
