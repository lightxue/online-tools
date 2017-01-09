<template>
  <canvas>
    {{ img }}
  </canvas>
</template>

<script>
import QRious from 'qrious'
import clipboard from '../util/clipboard.js'

export default {
  name: 'qr',

  props: {
    value: String,
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    fgColor: {
      type: String,
      default: '#000000',
    },
    bgAlpha: {
      type: Number,
      default: 1.0,
    },
    fgAlpha: {
      type: Number,
      default: 1.0,
    },
    level: {
      type: String,
      default: 'Q',
    },
    mime: {
      type: String,
      default: 'image/png',
    },
    padding: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 128,
    },
  },

  computed: {
    img: function() {
      try {
        const qr = new QRious({
          element: this.$el,
          value: this.value,
          background: this.bgColor,
          backgroundAlpha: this.bgAlpha,
          foreground: this.fgColor,
          foregroundAlpha: this.fgAlpha,
          level: this.level,
          mime: this.mime,
          padding: this.padding,
          size: this.size,
        });
      }
      catch (err) {
        console.log('Generate qrcode failed');
        console.log(err);
      }
      return '';
    }
  },

  methods: {
  }
}
</script>

<style scoped>
</style>

