/**
 * 改变状态的唯一方式， 根据指令来更新数据，这是个同步的事务。
 * */

import * as types from './types'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  keepAliveList: []
}

const mutations = {
  /**
   * 在keepalive列表中新增需要缓存的routeName
   */
  [types.ADD_KEEP_ALIVE]: (state, data) => {
    !state.keepAliveList.includes(data) && state.keepAliveList.push(data)
  },
  /**
   * 在keepalive列表中删除不需要缓存的routeName
   */
  [types.DELETE_KEEP_ALIVE]: (state, data) => {
    let dataIndex = state.keepAliveList.indexOf(data)
    state.keepAliveList.includes(data) && state.keepAliveList.splice(dataIndex, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
