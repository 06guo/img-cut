/**
 * 异步逻辑封装在action 中 ， 发送指令 ， 改变状态
 * */
import * as types from './types'

/**
 * 新增需要缓存的routename
 * @param {*} param
 * @param {*} data
 */
export const addKeepAliveAction = ({ commit }, data) => {
  commit(types.ADD_KEEP_ALIVE, data)
}

/**
 * 删除不需要缓存的routename
 * @param {*} param
 * @param {*} data
 */
export const deleteKeepAliveAction = ({ commit }, data) => {
  commit(types.DELETE_KEEP_ALIVE, data)
}
