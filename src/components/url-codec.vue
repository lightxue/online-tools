<template>
  <div>
    <codec @change="handle_change"
           ref="codec"
           title="URL编解码">
    </codec>
  </div>
</template>

<script>
import Codec from './codec.vue'

export default {
  name: 'url_codec',

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
      var func = codec.is_enc ? encodeURIComponent : decodeURIComponent;
      codec.encode(func);
    },
  }
}
</script>

<style scoped>
</style>
