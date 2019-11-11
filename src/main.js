import Vue from 'vue'
import App from './App.vue'
import router from './router'
// element引入
// import {} from 'element-ui'
import Element from 'element-ui'
// 全局css样式
// import './assets/css/global.css'
import '@/assets/css/global.css'
// 引入axios
import axios from 'axios'
// axios请求根地址设置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios原型继承给Vue成员，名称定义为$http(自定义的)
Vue.prototype.$http = axios

// 注册
Vue.use(Element)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
