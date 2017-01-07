<template>
  <div id="time-converter">
    <h1 class="page-header">时间转换
      <share-button :params="share_params"></share-button>
    </h1>

    <div id="current">
      <table>
        <tr>
          <td align='right'>当前时间: &nbsp;</td>
          <td>
            <copy-button class="display-button"
                         type="text"
                         :value="current_time">
              {{ this.current_time }}
            </copy-button>
          </td>
        </tr>
        <tr>
          <td align='right'>时间戳: &nbsp;</td>
          <td>
            <copy-button class="display-button"
                         type="text"
                         :value="current_timestamp">
              {{ this.current_timestamp }}
            </copy-button>
          </td>
        </tr>
        <tr>
          <td align='right'>距离现在: &nbsp;</td>
          <td>{{ from_now }}</td>
        </tr>
      </table>
    </div>

    <div class="input-group" :class="{'error-input': this.input && !moment.isValid()}">
      <el-popover ref="popover"
                  placement="bottom"
                  popper-class="time-popover"
                  trigger="hover">
        <div class="help-popover">
          <p>支持格式：</p>
          <div class="format">
            <div class="title">
              时间戳
            </div>
            <ul class="list">
              <li>1136185445</li>
              <li>1136185445.678</li>
            </ul>
          </div>
          <div class="format">
            <div class="title">
              完整时间
            </div>
            <ul class="list">
              <li>2006-01-02 15:04:05</li>
              <li>2006-01-02T15:04:05+08:00</li>
              <!--<li>Mon Jan 02 2006 15:04:05 GMT+0800 (CST)</li>-->
            </ul>
          </div>
          <div class="format">
            <div class="title">
              日期
            </div>
            <ul class="list">
              <li>2006-01-02</li>
              <li>20060102</li>
            </ul>
          </div>
          <div class="format">
            <div class="title">
              时间
            </div>
            <ul class="list">
              <li>15:04:05</li>
            </ul>
          </div>
      </el-popover>

      <label for="text">输入时间:</label>
      <el-input autofocus
                placeholder="例如 1136185445，20060102，2006-01-02，2006-01-02 15:04:05"
                v-model="input">
        <el-button slot="append"
                   v-popover:popover
                   icon="information">
        </el-button>
      </el-input>
    </div>

    <div class="output">
      <copy-input readonly label="时间戳:"  v-model="timestamp"/>
      <copy-input readonly label="本地时间:" v-model="local_time"/>
      <copy-input readonly label="UTC时间:" v-model="utc"/>
      <copy-input readonly label="ISO 8601:" v-model="iso8601"/>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import ShareButton from './share-button.vue'
import CopyInput from './copy-input.vue'
import CopyButton from './copy-button.vue'
import util from '../util'

export default {
  name: 'time_converter',

  components: {
    ShareButton,
    CopyInput,
    CopyButton,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      input: params.input ? params.input : '',
      now: moment(),
    }
  },

  computed: {
    moment: function() {
      var input = this.input.trim();
      var invalid = moment('invalid moment');
      if (input.length === 0) {
        return invalid;
      }

      // 各种尝试解析的函数列表
      var trys = [
        () => {
          var is_match = (/^\d{8}$/.test(input));
          return is_match ? moment(input, 'YYYYMMDD') : invalid;
        },
        () => {return moment.unix(Number(input));},
        () => {return moment(input, 'HH:mm:ss');},
        () => {return moment(input);},
      ];

      for (var i = 0; i < trys.length; ++i) {
        var m = trys[i]();
        if (m.isValid()) {
          return m;
        }
      }
      return invalid;
    },

    timestamp: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return String(this.moment.unix());
    },

    local_time: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.format('YYYY-MM-DD HH:mm:ss');
    },

    utc: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.clone().utc().format('YYYY-MM-DD HH:mm:ss');
    },

    iso8601: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.format('YYYY-MM-DDTHH:mm:ssZ');
    },

    current_time: function() {
      return this.now.format('YYYY-MM-DD HH:mm:ss');
    },

    current_timestamp: function() {
      return String(this.now.unix());
    },

    from_now: function() {
      if (!this.moment.isValid()) {
        return '未知';
      }
      var DAY = 86400;
      var HOUR = 3600;
      var MIN = 60;
      var duration = Math.abs((this.now - this.moment) / 1000);
      var day = Math.floor(duration / DAY);
      var hour = Math.floor(duration % DAY / HOUR);
      var min = Math.floor(duration % HOUR / MIN);
      var sec = Math.floor(duration % MIN);
      var display = '';
      if (day) {
        display += day + '天';
      }
      if (hour) {
        display += hour + '小时';
      }
      if (min) {
        display += min + '分钟';
      }
      display += sec + '秒';
      return display;
    },

    share_params: function() {
      if (!this.input) {
        return {};
      }
      return {
        input: this.input
      }
    }
  },

  methods: {
    update_now: function() {
      this.now = moment();
      setTimeout(this.update_now, 500);
    },
  },

  created: function() {
    this.update_now();
  }
}
</script>

<style scoped>
#output {
  margin-top: 40px;
}

#current {
  font-size: 18px;
}

#current table {
  margin: 0 auto;
}

#current .display-button {
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  padding: 0;
}

.help-popover {
  font-size: 16px;
  line-height: 1.2em;
}

.help-popover p {
  margin-top: .2em;
  margin-bottom: .2em;
}

.help-popover .format {
  font-size: 14px;
}

.help-popover .title {
  margin-top: 10px;
  font-weight: bold;
}

.help-popover .list {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 1em;
  list-style: none;
}

</style>
