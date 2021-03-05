import axios from 'axios'
import { Toast } from 'fs-ui'
import md5 from 'md5'
import store from '@/store/'
import './requestInterception'
import './responseInterception'

// 代理后的路径
axios.defaults.baseURL = '/api'
// 设置所有接口超时时间为10秒
axios.defaults.timeout = 10000
// 是否是mock数据
let isMock = true

/**
 * @function 对参数做特殊处理，用于验签；这边验签的规则看各自项目，这边是采用了风控系统验签
 * @author Eleven
 * @param {*} urlMethod 网关形式请求的url
 * @param {*} data 验签参数
 */
function handleParams (urlMethod, data) {
  console.log(urlMethod, data)
  let params = {
    appid: 'fs-vue-admin',
    content: '',
    method: urlMethod,
    version: '1.0',
    sign: ''
  }

  params.content = JSON.stringify(data)
  params.sign = md5(`appid=XXXX&content=${encodeURIComponent(params.content)}&method=${urlMethod}&version=1.0`)

  return params
}

/**
 * @function 封装请求；这边请求成功且success为true的时候的处理都在then中；请求失败或者业务逻辑错误的处理都在catch中；
 * @author Eleven
 * @param {*} reqOptions 请求的参数，可以直接是一个url；但是如果有参数的话需要传入一个对象
 */
function http (reqOptions) {
  let options = {
    url: '/gateway', // 请求url
    data: '', // 请求参数
    specialError: false, // 特殊的错误处理，这边指报错不使用统一提示，需要做特殊处理;这时候把整个response返回
    specialLoading: false, // 特殊的请求loading，不需要使用统一的loading开关
    method: 'post', // 请求类型，默认post
    contentType: 'application/json;charset=utf-8;' // contentType类型，默认是'application/json;charset=utf-8;'
  }
  let urlMethod = '' // 网关时候的接口url

  // 直接传了url链接
  if (typeof reqOptions === 'string') {
    urlMethod = reqOptions
  } else if (typeof reqOptions === 'object') {
    urlMethod = reqOptions.url
    delete reqOptions.url // 删除对象中的url，不然会覆盖options中的url
    options = { ...options, ...reqOptions }
  }

  // 如果是mock模式，请求url为urlMethod
  if (isMock) {
    options.url = urlMethod
  }

  // 经过转换后的真正的请求参数
  let reqData = handleParams(urlMethod, options.data)
  console.log(store.getters.token)
  return new Promise((resolve, reject) => {
    axios[options.method](
      options.url,
      reqData,
      {
        headers: {
          'Content-Type': options.contentType,
          token: store.getters.token // 请求接口所需的token，每个接口都需要，从sso认证中心跳转过来的时候，会拼接在链接后面
        }
      }
    )
      .then((response) => {
        // 可能接口不是返回json对象，所以这边做下判断；但是真正这样的情况，是后端修改后直接给到我们
        if (typeof response === 'string') {
          response = JSON.parse(response)
        }

        if (response.success) {
          resolve(response.data)
        } else {
          // 如果是特殊错误，则返回给对应请求自己处理
          if (options.specialError) {
            return reject(response)
          }
          Toast(response.message)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default http
