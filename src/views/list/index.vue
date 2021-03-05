<template>
  <div class="list" id="list" ref="wrapper">
    <fs-list @load="getList" v-model="loading" :finished="finished" loadingText="加载中" finishedText="加载完成">
      <fs-list-item
        style="text-align: left;"
        v-for="(item, index) in tableList" :key="`list_${index}`"
        :title="item.title"
        :describe="item.describe"
        :img="item.img"
        @click="handleClick(item, index)">
      </fs-list-item>
    </fs-list>
  </div>
</template>
<script>
import { getListServer } from '@/api/my'
import keepAlive from '@/mixins/keepAlive'
export default {
  name: 'list',
  mixins: [keepAlive],
  data () {
    return {
      finished: false,
      loading: false,
      tableList: []
    }
  },
  methods: {
    /**
     * 获取列表
     */
    getList () {
      if (this.finished) return
      getListServer(this.requestData).then((res) => {
        if (res.list.length < 7) {
          this.finished = true
        } else {
          this.loading = false
        }
        this.tableList = this.tableList.concat(res.list)
      })
    },
    handleClick (item, index) {
      this.$router.push({
        path: `/my/list/${index + 1}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
