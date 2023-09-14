import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// 全局配置 axios 请求的根路径, 可以不写.
//axios.defaults.baseURL = '10.251.253.181:50000'
// 把 axios 挂载到 Vue 原型上. 今后,在每个 .vue 组件中发起请求,直接调用 this.$http 即可.
Vue.prototype.$http = axios.create({baseURL: 'http://10.251.253.181:50000'})
Vue.prototype.$http2 = axios.create({baseURL: 'http://10.251.254.162:50000'})
Vue.prototype.$http3 = axios.create({baseURL: 'http://10.251.254.153:50000'})
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
