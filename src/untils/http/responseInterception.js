import axios from 'axios'
import store from '@/store'
import { Toast } from 'fs-ui'

/**
 * @function 响应拦截，如果是接口报错情况下做对应的提示；如果接口正常，则继续
 * @author Eleven
 */
axios.interceptors.response.use(
  config => {
    // 这边根据自己接口规则来做判断，判断是否是登陆失效；失效则跳转到登陆页面
    if (config.data.code === -104) {
      // 如果登陆超时等，把本地的存储信息进行删除
      sessionStorage.clear()
      localStorage.clear()
      // 先提示用户登陆失效，再跳转到登陆页面；这边使用强跳转，因为切换用户后，对应的路由权限会错乱
      setTimeout(() => {
        // 拿到在退出登录之前的路由
        let routeName = store.state.navigation.currentMatched.slice(-1)[0]
        // 如果有历史登陆页面，则把参数带过去，在login页面做对应的重定向
        window.location.href = `/login${routeName ? '?redirectRouteName=' + routeName : ''}`
      }, 2000)
    }
    return config.data
  },
  error => {
    // 出现错误后的错误文案变量
    let errorMsg = ''
    if (error && error.response) {
      // 常见错误信息列表，根据state展示对应的信息
      let errorMsgList = {
        400: '错误请求【400】',
        401: '未授权，请重新登录【401】',
        403: '拒绝访问【403】',
        404: '请求错误,未找到该资源【404】',
        405: '请求方法未允许【405】',
        408: '请求超时【408】',
        500: '服务器端出错【500】',
        501: '网络未实现【501】',
        502: '网络错误【502】',
        503: '服务不可用【503】',
        504: '网络超时【504】',
        505: 'http版本不支持该请求【505】'
      }
      errorMsg = errorMsgList[+error.response.status] || `连接错误${error.response.status}`
    } else {
      let errorMsgList = {
        'Network Error': '请检查网络情况',
        'Repeated requests': '同一时间请勿重复请求'
      }
      errorMsg = errorMsgList[error.message] || error.message
    }
    Toast(errorMsg)
    return Promise.reject(error)
  }
)
