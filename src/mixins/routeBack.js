/**
 * 返回上级
 * */
import { mapMutations, mapGetters } from 'vuex'

export default {
  beforeRouteLeave (to, from, next) {
    from.meta.routeBack = this.getRouteStatus
    next()
  },
  computed: {
    ...mapGetters([
      'getRouteStatus'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_ROUTE_BACK'
    ]),
    $_routerBack () {
      this.SET_ROUTE_BACK(true)
      this.$router.back()
    }
  }
}
