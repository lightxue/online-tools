<template>
  <div>
    <codec @change="handle_change"
           ref="codec"
           title="UTF-8编解码">
    </codec>
  </div>
</template>

<script>
import utf8 from 'utf8'

import util from '../util'
import Codec from './codec.vue'

export default {
  name: 'utf8_codec',

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
      var enc = (text) => {return util.hex_esc(utf8.encode(text));}
      var dec = (text) => {return utf8.decode(util.hex_unesc(text));}
      var func = codec.is_enc ? enc : dec;
      codec.encode(func);
    },
  }
}
</script>

<style scoped>
</style>
