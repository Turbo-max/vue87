import Vue from 'vue'
import App from './App.vue'
import router from './router'
// element引入
// import {} from 'element-ui'
import Element from 'element-ui'
// 全局css样式
// import './assets/css/global.css'
import '@/assets/css/global.css'


// 注册
Vue.use(Element)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
