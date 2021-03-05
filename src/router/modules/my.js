export default [
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue'),
    meta: {
      title: '我的',
      navBar: true, // 是否有顶部导航栏
      tabBar: true // 是否有底部tab栏
    }
  },
  {
    path: '/my/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '@/views/list/index.vue'),
    meta: {
      title: '订单',
      navBar: true,
      tabBar: false,
      keepAlive: true
    }
  },
  {
    path: '/my/list/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue'),
    meta: {
      title: '订单详情',
      tabBar: false,
      navBar: true
    }
  }
]
