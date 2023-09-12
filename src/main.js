import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// 全局配置 axios 请求的根路径, 可以不写.
axios.defaults.baseURL = 'https://mock.apifox.cn/m1/2617753-0-default'
// 把 axios 挂载到 Vue 原型上. 今后,在每个 .vue 组件中发起请求,直接调用 this.$http 即可.
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
