import '@babel/polyfill'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import 'flex.css' // 项目中所有flex布局，都使用flex.css，不要自己单独写；使用方法请看：https://cnodejs.org/topic/56d1148d9f876b7e6658579e
import '@/assets/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
