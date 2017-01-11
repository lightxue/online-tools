<template>
  <div
    :text="text"
    :crips="crips"
    :min-version="min-version"
    :level="level"
    :size="size"
    :fg-color="fgColor"
    :bg-color="bgColor"
    :rounded="rounded"
    :padding="padding"
    :mode="mode"
    :m-size="mSize"
    :m-pos-x="mPosX"
    :m-pos-y="mPosY"
    :label="label"
    :font-name="fontName"
    :font-color="fontColor"
    >
  </div>
</template>

<script>
import utf8 from 'utf8'
import kjua from 'kjua'
import clipboard from '../util/clipboard.js'

export default {
  name: 'qr',

  props: {
    text: String,
    crisp: {
      type: Boolean,
      default: true,
    },
    minVersion: {
      type: Number,
      default: 1,
    },
    level: {
      type: String,
      default: 'L',
    },
    size: {
      type: Number,
      default: 200,
    },
    fgColor: {
      type: String,
      default: '#333333',
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    rounded: {
      type: Number,
      default: 0,
    },
    padding: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      default: 'plain',
    },
    mSize: {
      type: Number,
      default: 30,
    },
    mPosX: {
      type: Number,
      default: 50,
    },
    mPosY: {
      type: Number,
      default: 50,
    },
    label: {
      type: String,
      default: '',
    },
    fontName: {
      type: String,
      default: 'sans',
    },
    fontColor: {
      type: String,
      default: '#333',
    },
    image: {
    },
  },

  beforeUpdate: function() {
    this.update();
  },

  mounted: function() {
    this.update();
  },

  methods: {
    update: function() {
      try {
        while (this.$el.hasChildNodes()) {
          this.$el.removeChild(this.$el.lastChild);
        }
        if (!this.text) {
          return ;
        }

        var qrcode = kjua({
          // render method: 'canvas' or 'image'
          render: 'canvas',
          // render pixel-perfect lines
          crisp: this.crisp,
          // minimum version: 1..40
          minVersion: this.minVersion,
          // error correction level: 'L', 'M', 'Q' or 'H'
          ecLevel: this.level,
          // size in pixel
          size: this.size,
          // pixel-ratio, null for devicePixelRatio
          ratio: null,
          // code color
          fill: this.fgColor,
          // background color
          back: this.bgColor,
          // content
          text: this.text,
          // roundend corners in pc: 0..100
          rounded: this.rounded,
          // quiet zone in modules
          quiet: this.padding,
          // modes: 'plain', 'label' or 'image'
          mode: this.mode == 'image' && this.image == null ? 'plain' : this.mode,
          // label/image size and pos in pc: 0..100
          mSize: this.mSize,
          mPosX: this.mPosX,
          mPosY: this.mPosY,
          // label
          label: this.label,
          fontname: this.fontName,
          fontcolor: this.fontColor,
          // image element
          image: this.image,
        });
        if (qrcode) {
          this.$el.appendChild(qrcode);
        }
      }
      catch (err) {
        console.log('Generate qrcode failed');
        console.log(err);
      }
      return '';
    }
  },
}
</script>

<style scoped>
</style>

