/**
 * 在移动端自适应
 * */
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize' // 判断是否支持横竖屏
  let recalc = function () {
    var clientWidth = docEl.clientWidth
    if (clientWidth >= 750) {
      docEl.style.fontSize = 32 + 'px'
    } else {
      docEl.style.fontSize = 32 * (clientWidth / 750) + 'px'
    }
  }
  // 设置body的最小高度
  // doc.body.style.minHeight = (win.innerHeight || docEl.clientHeight) + 'px'
  // 禁止浏览器或微信下拉出现网页来源等
  doc.body.addEventListener('touchmove', function (e) {
  }, { passive: false })
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
