import Vue from 'vue'
import router from '@/router'
import { lessThanIos10 } from '@/untils/util'
import vueg from './vueg/index'

import './vueg/index.css'

const options = {
  duration: '.3', // 转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false, // 值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '.6', // 首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'fadeInRight', // 前进动画，默认为fadeInRight
  backAnim: 'fadeInLeft', // 后退动画，默认为fedeInLeft
  sameDepthDisable: false, // url深度相同时禁用动画，默认为false
  tabs: [{
    name: 'home'
  }, {
    name: 'my'
  }], // 默认为[]，'name'对应路由的name,以实现类似app中点击tab页面水平转场效果，如tabs[1]到tabs[0]    ，会使用backAnim动画，tabs[1]到tabs[2]，会使用forwardAnim动画
  tabsDisable: true, // 值为true时，tabs间的转场没有动画，默认为false
  shadow: false, // 值为false，转场时没有阴影的层次效果
  disable: false, // 禁用转场动画，默认为false，嵌套路由默认为true
  nuxt: false // 若使用后端渲染框架Nuxt，需要将此设为true，默认为false
}

// 判断是否系统小于IOS10， 在IOS10以下， 加载vueg会报错，导致列表不能滚动
if (lessThanIos10()) {
  console.log('IOS10以下设备，不做翻页动画')
} else {
  Vue.use(vueg, router, options)
}
