import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import App from './components/app.vue'

Vue.use(ElementUI)

const app = new Vue({
  router,
  render: h => h(App)
});

app.$mount('#app');
