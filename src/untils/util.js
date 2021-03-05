/**
 * 判断系统是否小于ios 10， 如果是 返回true， 不然false
 * @returns {boolean}
 */
export const lessThanIos10 = () => {
  let version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
  try {
    return version[1] < 10
  } catch (error) {
    return false
  }
}
