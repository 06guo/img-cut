/**
 * 项目中 html中所有的引用都做统一管理，其他页面需要引入的时候，直接引用就好；
 */

// 外链图片的公共域名
const IMG_HOST = 'https://life-circle.oss-cn-beijing.aliyuncs.com'

const defaultBackIcon = require('../assets/images/nav_back_icon.png')
const selectedIcon = require('../assets/images/menuManage/slider_selected_icon.png')
const searchActionIcon = require(`${IMG_HOST}/img/01.006d32a.png`)
const tableTempIcon = require(`${IMG_HOST}/img/01.006d32a.png`)

export {
  defaultBackIcon,
  selectedIcon,
  searchActionIcon,
  tableTempIcon
}
