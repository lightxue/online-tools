<template>
  <main-frame id="time-converter">
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
              <li>Mon, 02 Jan 2006 15:04:05 +0800</li>
              <li>Mon Jan 02 2006 15:04:05 GMT+0800 (CST)</li>
            </ul>
          </div>
          <div class="format">
            <div class="title">
              日期
            </div>
            <ul class="list">
              <li>2006-01-02</li>
              <li>20060102</li>
              <li>2006年01月02日</li>
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

      <div id="options">
        <el-checkbox v-model="is_utc">展示UTC时间</el-checkbox>
      </div>
    </div>

    <div class="output">
      <copy-input readonly label="时间戳:"  v-model="timestamp"/>
      <copy-input readonly label="常见格式:" v-model="normal_time"/>
      <copy-input readonly label="ISO 8601:" v-model="iso8601"/>
      <copy-input readonly label="RFC 822:" v-model="rfc822"/>
      <copy-input readonly label="RFC 2822:" v-model="rfc2822"/>
    </div>

  </main-frame>
</template>

<script>
import moment from 'moment'
import MainFrame from './main-frame.vue'
import ShareButton from './share-button.vue'
import CopyInput from './copy-input.vue'
import CopyButton from './copy-button.vue'
import util from '../util'

export default {
  name: 'time_converter',

  components: {
    MainFrame,
    ShareButton,
    CopyInput,
    CopyButton,
  },

  data () {
    var params = util.get_recovery(this.$route.name, this.$route.query)

    return {
      input: params.input ? params.input : '',
      is_utc: params.is_utc === 'true',
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
        () => {return moment(input);},
        () => {return moment(input, 'HH:mm:ss');},
        () => {return moment(input, 'YYYY年MM月DD日');},
      ];

      for (var i = 0; i < trys.length; ++i) {
        var m = trys[i]();
        if (m.isValid()) {
          return this.is_utc ? m.utc() : m;
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

    normal_time: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.format('YYYY-MM-DD HH:mm:ss');
    },

    iso8601: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.format('YYYY-MM-DDTHH:mm:ssZ');
    },

    rfc822: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      return this.moment.format('ddd, DD MMM YYYY HH:mm:ss ZZ');
    },

    rfc2822: function() {
      if (!this.moment.isValid()) {
        return '';
      }
      var date = this.moment.toDate();
      //return this.is_utc ? date.toUTCString() : date.toString();
      return date.toUTCString();
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
      var data = {
        input: this.input,
        is_utc: this.is_utc
      };
      data = this.input ? data : {};
      util.set_local_storage(this.$route.name, data);
      return data;
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
