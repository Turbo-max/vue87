import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  let loginData = window.sessionStorage.getItem('loginData')
  if (!loginData && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
