import Vue from 'vue'
import Router from 'vue-router'
import my from './modules/my'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import(/* webpackChunkName: "root" */ '@/views/root/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
          meta: {
            title: '首页',
            navBar: false,
            tabBar: true
          }
        },
        ...my
      ]
    }
  ]
})
/**
 * 路由跳转之前
 * */
router.beforeEach((to, from, next) => {
  next()
})

/**
 * 路由跳转成功之后
 * */
router.afterEach(({ meta, path }, from, next) => {
  document.title = meta.title
})

export default router
