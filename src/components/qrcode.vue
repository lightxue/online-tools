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
          <div class="config-group">
            <div class="config-item config-group1">
              <label for="crisp">CRISP: </label>
              <el-switch v-model="crisp"></el-switch>
            </div>
            <div class="config-item config-group2 min-version">
              <label for="">最低版本</label>
              <el-input-number v-model="min_version" :min="1" :max="40"></el-input-number>
            </div>
          </div>
          <div class="config-group">
            <div class="config-item config-group3">
              <label for="level">容错级别: </label>
              <el-select v-model="level">
                <el-option value="L" label="L - 低(7%)" ></el-option>
                <el-option value="M" label="M - 中(15%)" ></el-option>
                <el-option value="Q" label="Q - 偏高(25%)" ></el-option>
                <el-option value="H" label="H - 高(30%)" ></el-option>
              </el-select>
            </div>
          </div>
          <div class="config-item">
            <label for="rounded">圆角: </label>
            <el-slider v-model="rounded"
                       :min="0"
                       :max="100"
                       show-input>
            </el-slider>
          </div>
          <div class="config-group">
            <div class="config-item config-group1">
              <label for="size">图像大小: </label>
              <el-slider v-model="size"
                         :min="32"
                         :max="1024"
                         show-input>
              </el-slider>
            </div>
            <div class="config-item config-group2">
              <label for="padding">边框: </label>
              <el-slider v-model="padding"
                         :min="0"
                         :max="72"
                         show-input>
              </el-slider>
            </div>
          </div>
          <div class="config-item">
            <label for="fg_color">颜色: </label>
            <input type="color" v-model="fg_color"></input>
          </div>
          <div class="config-item">
            <label for="bg_color">背景颜色: </label>
            <input type="color" v-model="bg_color"></input>
          </div>
        </div>
      </transition>
    </div>

    <div id="output" align="center">
      <qr class="qr"
        :text="text"
        :crips="crips"
        :min-version="min_version"
        :level="level"
        :size="size"
        :fg-color="fg_color"
        :bg-color="bg_color"
        :rounded="rounded"
        :padding="padding"
        :mode="mode"
        :m-size="m_size"
        :m-pos-x="m_pos_x"
        :m-pos-y="m_pos_y"
        :label="label"
        :font-name="font_name"
        :font-color="font_color"
        >
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
      crisp: params.crisp === 'false' ? false: true,
      min_version: util.parse_num(params.min_version, 1),
      level: params.level ? params.level : 'L',
      size: util.parse_num(params.size, 300),
      fg_color: params.fg_color ? params.fg_color : '#333333',
      bg_color: params.fg_color ? params.bg_color : '#ffffff',
      rounded: util.parse_num(params.rounded, 0),
      padding: util.parse_num(params.padding, 0),
      mode: params.mode ? params.mode : 'plain',
      m_size: util.parse_num(params.m_size, 30),
      m_pos_x: util.parse_num(params.m_pos_x, 50),
      m_pos_y: util.parse_num(params.m_pos_y, 50),
      label: params.label ? params.label : '',
      font_name: params.font_name ? params.font_name : '',
      font_color: params.font_color ? params.font_color : '',
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
}

.config-group1, .config-group2, .config-group3{
  display: inline;
}

.config .el-input-number {
  width: 120px;
}

.config .min-version .el-select {
  width: 120px;
}

.config label {
  margin-right: 10px;
}
</style>
