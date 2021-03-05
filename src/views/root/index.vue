<template>
  <div id="root" class="root">
    <fs-nav-bar
      v-show="$route.meta.navBar"
      :title="$route.meta.title + '||' + JSON.stringify(keepAliveList)"
      left-arrow
      fixed
      z-index="1000"
      @click-left.stop="$router.back()" />
    <keep-alive :include="keepAliveList">
      <router-view class="router" v-transition="hasTransition"/>
    </keep-alive>
    <!-- <fs-tabbar
      v-show="$route.meta.tabBar"
      v-model="active"
      :z-index="1000"
      @change="changeItem">
      <fs-tabbar-item
        v-for="(item, index) in tabs"
        :key="index"
        :icon="item.icon"
        :to="item.to"
        redirect >{{item.title}}</fs-tabbar-item>
      </fs-tabbar> -->
  </div>
</template>
<script>
import { lessThanIos10 } from '@/untils/util'
import { mapGetters } from 'vuex'

export default {
  name: 'root',
  data () {
    return {
      hasTransition: true, // 是否有动画；为了解决在IOS10以下版本中的bug
      active: 0,
      tabs: [
        {
          icon: 'home',
          to: '/home',
          title: '首页'
        }, {
          icon: 'user',
          to: '/my',
          title: '我的'
        }
      ]
    }
  },
  created () {
    // 判断是否系统小于IOS10， 在IOS10以下， 加载vueg会报错，导致列表不能滚动
    if (lessThanIos10()) {
      this.hasTransition = false
      console.log('小于IOS10')
    }
  },
  computed: {
    ...mapGetters([
      'keepAliveList'
    ])
  },
  methods: {
    changeItem () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
