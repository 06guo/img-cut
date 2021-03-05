/**
 * 专门提供给需要缓存的组件使用的混合；为了缓存列表的数据与滚动条位置
 * */
import { mapActions } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.meta.keepAlive) {
        vm.addKeepAliveAction(to.name)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // 是否是返回或者存在存在标签中
    let isBack = from.path.indexOf(to.path) > -1
    isBack && this.deleteKeepAliveAction(from.name)
    next()
  },
  methods: {
    ...mapActions([
      'addKeepAliveAction',
      'deleteKeepAliveAction'
    ])
  }
}
