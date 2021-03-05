/**
 * 获取vuex中存储的数据
 * */

/**
 * 获取路由状态
 */
export const keepAliveList = state => {
  console.log('||||', state.keepAliveList)
  return state.keepAliveList
  // return Array.from(state.keepAliveList)
}
