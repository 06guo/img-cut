<template>
  <div class="my">
    <div class="my-info">
      <img class="my-info-avater" src="~assets/images/avatar.png" />
      <div class="my-info-name">派大星</div>
    </div>
    <fs-cell-group>
      <fs-cell title="我的订单" to="/my/list"></fs-cell>
    </fs-cell-group>
    <fs-cell-group>
      <fs-cell title="收获地址"  to="/my/list" no-border></fs-cell>
      <fs-cell title="常见问题" to="/my/list"></fs-cell>
      <fs-cell title="客服消息"  to="/my/list"></fs-cell>
    </fs-cell-group>
    <fs-cell-group>
      <fs-cell title="设置" to="/my/list"></fs-cell>
    </fs-cell-group>
  </div>
</template>

<script>
export default {
  name: 'my',
  created () {
    console.log('我的页面')
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
