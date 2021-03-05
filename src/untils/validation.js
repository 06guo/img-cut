const Validation = {
  checkPhone, // 检测是否为电话号码
  isEmpty, // 是否为空
  isNumber, // 是否为数字
  checkPwd, // 检测密码格式 6-16位数字或字母
  checkPwd2, // 检测密码格式 6-16位数字和字母
  isIdcard, // 检测身份证是否合法
  isTel, // 检测电话号码（包括座机号和手机号）
  isChina, // 检测是否为中文
  isFeePoint, // 判断最多小数点后6位
  isInteger, // 是否是正整数
  isURL, // 合法uri
  isLowerCase, // 小写字母
  isUpperCase, // 大写字母
  isAlphabets // 大小写字母
}

/**
 * 检验手机号码
 * @param {String, Number} num 手机号码
 * @returns {boolean}
 */
function checkPhone (num) {
  return /^1\d{10}$/.test(num)
}

/**
 * 是否是正整数
 * @param {String, Number} str
 * @returns {boolean}
 */
function isInteger (str) {
  str = str || ''
  return /^\+?[1-9]\d*$/.test(str)
}

/**
 * 是否为空字符串
 * @param {String} str
 * @returns {boolean}
 */
function isEmpty (str) {
  str = str || ''
  return /^\s*$/.test(str)
}

/**
 * 是否为是数字
 * @param {String} str
 * @returns {boolean}
 */
function isNumber (str) {
  str = str || 0
  return /^\d+(\.\d+)?$/.test(str)
}

/**
 * 是否为是电话号码
 * @param {String} str
 * @returns {boolean}
 */
function isTel (str) {
  str = str || ''
  return /^(((\d{3,4}-?)?\d{7,8})|(1\d{10}))$/.test(str)
}

/**
 * 是否为是中文
 * @param {String} str
 * @returns {boolean}
 */
function isChina (str) {
  str = str.replace(/[\u4e00-\u9fa5]+/g, '')
  return str
}

/**
 * 小数点后最多6位
 * @param val
 * @returns {boolean}
 */
function isFeePoint (val) {
  var reg = /^[+-]?\d+(\.\d{1,6})?$/
  return reg.test(val)
}

/**
 * 检查密码
 * @param val
 * @returns {boolean}
 */
function checkPwd (str) {
  str = str || ''
  return /^[a-zA-Z0-9]{6,16}$/.test(str)
}

/**
 * 检查密码2
 * @param val
 * @returns {boolean}
 */
function checkPwd2 (str) {
  str = str || ''
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(str)
}

/**
 * 检查身份证
 * @param val
 * @returns {boolean}
 */
function isIdcard (ID) {
  if (typeof ID !== 'string') return '非法字符串'
  var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
  var d = new Date(birthday)
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  var currentTime = new Date().getTime()
  var time = d.getTime()
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  var sum = 0
  var i
  var residue

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false
  if (city[ID.substr(0, 2)] === undefined) return false
  if (time >= currentTime || birthday !== newBirthday) return false
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i]
  }
  residue = arrCh[sum % 11]
  if (residue !== ID.substr(17, 1).toUpperCase()) return false

  return true
}

/**
 * 合法uri
 * @param {String} str
 * @returns {boolean}
 */
function isURL (str) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(str)
}

/**
 * 小写字母
 * @param {String} str
 * @returns {boolean}
 */
export function isLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写字母
 * @param {String} str
 * @returns {boolean}
 */
export function isUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
/**
 * 大小写字母
 * @param {String} str
 * @returns {boolean}
 */
export function isAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export default Validation
