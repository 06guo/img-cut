/**
 * 本文件自定义了手指的长按，左滑，右滑，上滑，下滑操作
 * 如需要使用更多手势操作，请自行接入 v-tap
 */
import Vue from 'vue'
function vueTouch (el, binding, type) {
  this.obj = el
  this.binding = binding
  this.touchType = type
  this.vueTouches = { x: 0, y: 0 }
  this.vueLeave = true
  this.vueMoves = true
  this.longTouch = true
  this.vueCallBack = typeof (binding.value) === 'object' ? binding.value.fn : binding.value
  this.obj.addEventListener('touchstart', this.start.bind(this))
  this.obj.addEventListener('touchend', this.end.bind(this))
  this.obj.addEventListener('touchmove', this.move.bind(this))
}
vueTouch.prototype = {
  start (e) {
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true
    this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType === 'longtap' && this.vueCallBack(this.touchType, e)
        this.longTouch = false
      }
    }.bind(this), 1000)
  },
  end (e) {
    var disX = e.changedTouches[0].pageX - this.vueTouches.x
    var disY = e.changedTouches[0].pageY - this.vueTouches.y
    clearTimeout(this.time)
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
      this.touchType === 'swipe' && this.vueCallBack(this.touchType, e)
      if (Math.abs(disX) > Math.abs(disY)) {
        if (disX > 10) {
          this.touchType === 'swiperight' && this.vueCallBack(this.touchType, e)
        }
        if (disX < -10) {
          this.touchType === 'swipeleft' && this.vueCallBack(this.touchType, e)
        }
      } else {
        if (disY > 10) {
          this.touchType === 'swipedown' && this.vueCallBack(this.touchType, e)
        }
        if (disY < -10) {
          this.touchType === 'swipeup' && this.vueCallBack(this.touchType, e)
        }
      }
    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType === 'tap' && this.vueCallBack(this.touchType, e)
        this.vueLeave = false
      }
    }
  },
  move () {
    this.vueMoves = false
  }
}

// 自定义tap事件
Vue.directive('tap', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'tap')
  }
})
Vue.directive('swipe', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'swipe')
  }
})
Vue.directive('swipeleft', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'swipeleft')
  }
})
Vue.directive('swiperight', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'swiperight')
  }
})
Vue.directive('swipedown', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'swipedown')
  }
})
Vue.directive('swipeup', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'swipeup')
  }
})
Vue.directive('longtap', {
  bind: function (el, binding) {
    // eslint-disable-next-line
    new vueTouch(el, binding, 'longtap')
  }
})
