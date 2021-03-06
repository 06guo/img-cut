/**
 * 应用级的状态集中放在 store 中
 * */

import Vue from 'vue'
import Vuex from 'vuex'
import routeBack from './modules/routeBack'
import keepAlive from './modules/keepAlive'

/**
 * 注册Vuex插件
 * */
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    routeBack,
    keepAlive
  },
  strict: process.env.NODE_ENV !== 'production' // 当开发模式时候，启用严格模式
})
