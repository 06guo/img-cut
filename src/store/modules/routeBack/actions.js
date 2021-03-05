/**
 * 异步逻辑封装在action 中 ， 发送指令 ， 改变状态
 * */
import * as types from './types'

/**
 * 设置路由信息
 * @param {*} param
 * @param {*} data
 */
export const setRouteBack = ({ commit }, data) => {
  // TODO: 异步的逻辑
  commit(types.SET_ROUTE_BACK, data)
}
