import axios from 'axios'

let CancelToken = axios.CancelToken

/**
 * @function 请求拦截,这边做同一请求的拦截操作，如果同一个请求没有请求完成，不能再次发起；如果多次点击，只会请求最后一次
 * @author Eleven
 */
axios.interceptors.request.use(config => {
  // 请求参数字符串，如果是object则强转string
  let requestDataStr = typeof config.data === 'string' ? config.data : JSON.stringify(config.data)
  // 将请求url、请求类型、请求参数整合成一个字符串，用它来判断是否是重复请求
  let requestName = `${config.url}&${config.method}&${requestDataStr}`
  if (requestName) {
    if (axios[requestName] && axios[requestName].cancel) {
      axios[requestName].cancel('Repeated requests')
    }
    config.cancelToken = new CancelToken(cancel => {
      axios[requestName] = {}
      axios[requestName].cancel = cancel
    })
  }

  return config
}, error => {
  return Promise.reject(error)
})
