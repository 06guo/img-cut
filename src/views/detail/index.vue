<template>
  <div class="demo" ref="wrapper">
    <fs-button @click="$_routerBack">返回</fs-button>
  </div>
</template>
<script>
import routeBack from '@/mixins/routeBack'
export default {
  name: 'detail',
  mixins: [routeBack]
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
