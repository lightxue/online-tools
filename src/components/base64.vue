<template>
  <div>
    <codec @change="handle_change"
           ref="codec"
           title="Base64">
    </codec>
  </div>
</template>

<script>
import {Base64} from 'js-base64'
import Codec from './codec.vue'

export default {
  name: 'base64',

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
      var func = codec.is_enc ? Base64.encode : Base64.decode;
      codec.encode(func);
    },
  }
}
</script>

<style scoped>
</style>
