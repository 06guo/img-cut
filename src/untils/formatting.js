/**
 * 格式化时间
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
  if (!str) return ''
  const date = new Date(str)
  const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}

/**
 * 格式化日期
 * @param {Object} date 传入的Date
 * @param {String} type 需要转换的类型  YYYY-MM-DD ： 只需要日期 ； YYYY-MM-DD HH:MM:SS ： 日期加时分秒
 */
export const transitionDate = (date, type) => {
  // 当不是毫秒时候，转换为毫秒
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)
  let format = ''
  switch (type) {
    case 'YYYY-MM-DD':
      format = `${year}-${month}-${day}`
      break
    case 'HH:MM:SS':
      format = `${hour}:${minute}:${second}`
      break
    default:
      format = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
  }
  return format
}

/**
 * 时间戳转时间
 * @param {String|Number} val 传入的时间戳
 * @returns date
 */
export const timestampToDate = (val) => {
  // 当不是毫秒时候，转换为毫秒
  val = val * 1 < 10000000000 ? val * 1000 : val

  return new Date(val)
}

/**
 * 格式化时间戳
 * @param {String|Number}  val 传入的时间戳
 * @param {String} type 需要转换的类型  YYYY-MM-DD ： 只需要日期 ； YYYY-MM-DD HH:MM:SS ： 日期加时分秒
 */
export const transitionTimestamp = (val, type) => {
  // 当不是毫秒时候，转换为毫秒
  let date = timestampToDate(val)
  return transitionDate(date, type)
}
