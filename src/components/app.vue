<template>
  <div id="app">
    <div id="main">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>

    <div id="footer">
      <p>Copyright © {{ year }} - <a href="http://www.lightxue.com">Light Xue</a> --
      <a href="https://github.com/lightxue/online-tools">F<span class="mask">or</span>k me</a></p>
    </div>
  </div>
</template>

<script>

export default {

  components: {
  },

  data () {
    var year = new Date().getYear() + 1900;
    return {
      year
    }
  },

  methods: {
  },
}
</script>

<style>

html, body {
  font-size:  16px;
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  min-height: 100%;
  position: relative;
}

#main {
  padding: 10px;
  padding-bottom: 70px;    /* Height for the footer */
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  padding-top: 10px;
  margin-top: 20px;
  color: #777;
  border-top: 1px solid #e5e5e5;
  text-align: center;
}

#footer p {
  margin:0;
  padding:10px;
}

#footer a {
  text-decoration: none;
}

#footer a { color: #20A0FF; }
#footer a:visited { color: #20A0FF; }
#footer a:hover { color: #20A0FF; }
#footer a:active { color: #20A0FF; }

#footer .mask {
  background-color: #20A0FF;
  color: #20A0FF;
  text-shadow: none;
  border-radius: 0.3em;
}

.page-header .permalink {
  font-size: 14px;
  color: rgb(51, 51, 51);
}

.code {
  font-family: Monaco, Inconsolata, Menlo, 'Andale Mono', 'lucida console', 'Courier New', monospace;
}

label {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-size: 16px;
  font-weight: 7000;
}

.input-group {
  margin-top: 20px;
}

.error-input input:hover, .error-input textarea:hover {
  border-color: #FF4949;
}

.error-input input:focus, .error-input textarea:focus {
  border-color: #FF4949;
}

.error-input input, .error-input textarea {
  border-color: #FF4949;
}

#options {
  margin-top: 10px;
}

#options .option+.option {
  margin-left: 30px;
}

.custom-input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  font-size: 14px;
  height: 30px;
  line-height: 1;
  padding: 2px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.auto-width-notice {
  width: auto;
}

a {
  text-decoration: none;
}
</style>
