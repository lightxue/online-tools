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
      <el-button type="primary" @click="show_dialog = true">
        配置参数
      </el-button>

      <el-dialog title="详细参数配置" size="large" v-model="show_dialog">
        <el-row>
          <el-col :span="14" :offset="1">
            <div class="config">
              <el-row>
                <el-col :span="12">
                  <div class="config-col">
                    <div class="config-item">
                      <label for="crisp">CRISP: </label>
                      <el-switch v-model="crisp"></el-switch>
                    </div>
                    <div class="config-item">
                      <label for="fg_color">颜色: </label>
                      <input type="color" v-model="fg_color"></input>
                    </div>
                    <div class="config-item">
                      <label for="bg_color">背景颜色: </label>
                      <input type="color" v-model="bg_color"></input>
                    </div>
                    <div class="config-item">
                      <label for="">最低版本</label>
                      <el-input-number v-model="min_version" :min="1" :max="40"></el-input-number>
                    </div>
                    <div class="config-item">
                      <label for="level">容错级别: </label>
                      <el-select v-model="level">
                        <el-option value="L" label="L - 低(7%)" ></el-option>
                        <el-option value="M" label="M - 中(15%)" ></el-option>
                        <el-option value="Q" label="Q - 偏高(25%)" ></el-option>
                        <el-option value="H" label="H - 高(30%)" ></el-option>
                      </el-select>
                    </div>
                    <div class="config-item">
                      <label for="rounded">圆角: </label>
                      <el-slider v-model="rounded"
                                 :min="0"
                                 :max="100"
                                 show-input>
                      </el-slider>
                    </div>
                    <div class="config-item">
                      <label for="size">图像大小: </label>
                      <el-slider v-model="size"
                                 :min="30"
                                 :max="400"
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
                  </div>
                </el-col>
                <el-col :span="12" class="config-col">
                  <div class="config-col">
                    <div class="config-item">
                      <label for="mode">logo模式: </label>
                      <el-select v-model="mode">
                        <el-option value="plain" label="无" ></el-option>
                        <el-option value="label" label="文字" ></el-option>
                        <el-option value="image" label="图案" ></el-option>
                      </el-select>
                    </div>
                    <transition name="fade">
                      <div class="config-item" v-if="mode == 'image'">
                        <label for="image">上传logo: </label>
                        <el-upload class="upload-file"
                                   action=""
                                   :before-upload="on_img_change"
                                   :default-file-list="fileList">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <img :src="img_buf" id="img-buf"/>
                      </div>
                    </transition>
                    <transition name="fade">
                      <div v-if="mode == 'label'">
                        <div class="config-item">
                          <label for="label">文字内容: </label>
                          <input class="custom-input" v-model="label"></input>
                        </div>
                        <div class="config-item">
                          <label for="label">字体: </label>
                          <input class="custom-input" v-model="font_name"></input>
                        </div>
                        <div class="config-item">
                          <label for="font_color">字体颜色: </label>
                          <input type="color" v-model="font_color"></input>
                        </div>
                      </div>
                    </transition>
                    <div class="config-item">
                      <label for="m_size">logo大小: </label>
                      <el-slider v-model="m_size"
                                 :min="0"
                                 :max="100"
                                 show-input>
                      </el-slider>
                    </div>
                    <div class="config-item">
                      <label for="m_pos_x">logo位置X: </label>
                      <el-slider v-model="m_pos_x"
                                 :min="0"
                                 :max="100"
                                 show-input>
                      </el-slider>
                    </div>
                    <div class="config-item">
                      <label for="m_pos_y">logo位置Y: </label>
                      <el-slider v-model="m_pos_y"
                                 :min="0"
                                 :max="100"
                                 show-input>
                      </el-slider>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="config-output" align="center">
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
                :image="image"
                >
              </qr>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
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
        :image="image"
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
      text: params.text ? params.text : '',
      crisp: params.crisp === 'false' ? false: true,
      min_version: util.parse_num(params.min_version, 1),
      level: params.level ? params.level : 'L',
      size: util.parse_num(params.size, 300),
      fg_color: params.fg_color ? params.fg_color : '#333333',
      bg_color: params.fg_color ? params.bg_color : '#ffffff',
      rounded: util.parse_num(params.rounded, 50),
      padding: util.parse_num(params.padding, 1),
      mode: params.mode ? params.mode : 'plain',
      m_size: util.parse_num(params.m_size, 10),
      m_pos_x: util.parse_num(params.m_pos_x, 50),
      m_pos_y: util.parse_num(params.m_pos_y, 50),
      label: params.label ? params.label : 'lightxue',
      font_name: params.font_name ? params.font_name : 'Ubuntu',
      font_color: params.font_color ? params.font_color : '#ff9818',
      show_dialog: true,
      image: null,
      img_buf: '',
    };
  },

  computed: {
    share_params: function() {
        if (!this.text) {
          return {};
        }
        return {
          text: this.text
        };
    }
  },

  methods: {
    on_img_change: function(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        vm.img_buf = e.target.result;
        vm.image = document.getElementById('img-buf');
        vm.mode = 'image';
      }
      reader.readAsDataURL(file);
      return false;
    },
  }
}
</script>

<style scoped>
#output {
  margin: auto;
  width: 300px;
  height: 300px;
}

.qr {
  width: 300px;
  height: 300px;
}

.config .config-item {
  margin-top: 10px;
}

.config label {
  margin-right: 10px;
}

.config-output {
  display: inline;
}

.config-col {
  padding-left: 20px;
  padding-right: 20px;
}

.config-output .qr {
  margin-top: 50px;
}

.config-item .el-input {
  display: inline;
}

.config-item .custom-input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  font-size: 14px;
  height: 36px;
  line-height: 1;
  padding: 1px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

#img-buf {
  display: none;
}

</style>
