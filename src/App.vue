<template>
  <router-view/>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'app',
  mounted () {
    this.$nextTick(() => {
      // 修复刷新时没有滚到顶部
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
    })
  },
  computed: {
    ...mapGetters({
      'status': 'getRouteStatus'
    })
  },
  methods: {
    ...mapMutations({
      'setRouteStatusAsync': 'SET_ROUTE_BACK'
    }),
    ...mapActions({
      'setRouteStatus': 'setRouteBack'
    })
  }
}
</script>
