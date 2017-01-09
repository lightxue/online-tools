<template>
  <div>
    <h1 class="page-header">二维码
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="input-group">
      <label for="text">编码文本:</label>
      <el-input type="textarea"
                autofocus
                :autosize="{ minRows: 3, maxRows: 8 }"
                v-model="text">
      </el-input>
    </div>

    <div id="options">
      <el-button type="text"
                 class="show-config"
                 :class="{ 'el-icon-caret-right': !is_config, 'el-icon-caret-bottom': is_config }"
                 @click="is_config = !is_config">
        配置参数
      </el-button>

      <transition name="fade" mode="out-in">
        <div class="config" v-if="is_config">
          <div class="config-item">
            <label for="level">纠错级别: </label>
            <el-select v-model="level">
              <el-option value="L" label="L (7%)" ></el-option>
              <el-option value="M" label="M (15%)" ></el-option>
              <el-option value="Q" label="Q (25%)" ></el-option>
              <el-option value="H" label="H (30%)" ></el-option>
            </el-select>
          </div>
          <div class="config-item">
            <label for="size">图像大小: </label>
            <el-slider v-model="size"
                       :min="32"
                       :max="1024"
                       show-input>
            </el-slider>
          </div>
          <div class="config-item">
            <label for="padding">边框: </label>
            <el-slider v-model="padding"
                       :min="0"
                       :max="72"
                       show-input>
            </el-slider>
          </div>
          <div class="config-item">
            <label for="fg_color">颜色: </label>
            <input type="color" v-model="fg_color"></input>
          </div>
          <div class="config-item">
            <label for="bg_color">前景颜色: </label>
            <input type="color" v-model="bg_color"></input>
          </div>
          <!--<div class="config-item">-->
            <!--<label for="mime">图片格式: </label>-->
            <!--<el-radio-group v-model="mime">-->
              <!--<el-radio label="image/jpeg">jpg</el-radio>-->
              <!--<el-radio label="image/png">png</el-radio>-->
              <!--<el-radio label="image/svg">svg</el-radio>-->
            <!--</el-radio-group>-->
          <!--</div>-->
        </div>
      </transition>
    </div>

    <div id="output" align="center">
      <qr class="qr"
          :value="text"
          :fg-color="fg_color"
          :bg-color="bg_color"
          :bg_alpha="bg_alpha"
          :fg_alpha="fg_alpha"
          :level="level"
          :mime="mime"
          :padding="padding"
          :size="size">
      </qr>
    </div>
  </div>
</template>

<script>
import QR from './qr.vue'
import ShareButton from './share-button.vue'
import util from '../util'

export default {
  name: 'qrcode',

  components: {
    'qr': QR,
    ShareButton,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      is_config: params.is_config === 'true',
      text: params.text ? params.text : '',
      bg_color: params.text ? params.bg_color : '#ffffff',
      fg_color: params.text ? params.fg_color : '#000000',
      bg_alpha: util.parse_num(params.bg_alpha, 1.0),
      fg_alpha: util.parse_num(params.fg_alpha, 1.0),
      level: params.level ? params.level : 'Q',
      mime: params.mime ? params.mime : 'image/png',
      padding: params.padding ? params.padding : 0,
      size: util.parse_num(params.size, 300),
    };
  },

  computed: {
    share_params: function() {
        if (!this.text) {
          return {};
        }
        return this.$data;
    }
  },

  methods: {
  }
}
</script>

<style scoped>
.show-config {
  font-size: 16px;
}

#output {
  margin: auto;
  width: 300px;
  height: 300px;
}

#output {
  margin: auto;
}

#output .qr {
  max-width: 500px;
  max-height: 500px;
}

.config .config-item {
  margin-top: 10px;
  width: 61.5%;
}

.config label {
  margin-right: 10px;
}
</style>
