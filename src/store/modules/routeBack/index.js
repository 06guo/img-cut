/**
 * 改变状态的唯一方式， 根据指令来更新数据，这是个同步的事务。
 * */

import * as types from './types'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  status: false
}

const mutations = {
  [types.SET_ROUTE_BACK]: (state, val) => {
    state.status = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
