<template>
  <div class="clipping-bg" ref="fsCropper">
    <!-- 图片展示 S -->
    <div ref="imgToFile" id="imgToFile" class="display-img" :style="{
    'width': trueWidth + 'px',
    'height': trueHeight + 'px',
    'top':  initY + 'px',
    'left':  initX  + 'px',
    'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x  + 'px,' + y + 'px,' + '0)'
    + 'rotateZ('+ rotate * 90 +'deg)'
    }">
      <img ref="pic" :src="imgs">
    </div>
    <!-- 图片展示 E -->
    <!-- 遮罩层 S -->
    <div class="mask-content-bg" @mousedown="startMove" @touchstart="startMove">
      <div class="mask-layer-top bg-layer" :style="{height: cutTop + 'px'}"></div>
      <div class="mask-layer-middle" :style="{height: cropHeight + 'px'}">
        <span class="bg-layer content-layer" :style="{width: cutLeft + 'px', height: cropHeight + 'px'}"></span>
        <span class="content-layer content-layer-middle" :style="{width: cropWidth + 'px', height: cropHeight + 'px'}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="bg-layer content-layer" :style="{width: cutLeft + 'px', height: cropHeight + 'px'}"></span>
      </div>
      <div class="mask-layer-bottom bg-layer" :style="{height: cutTop + 'px'}"></div>
    </div>
    <!-- 遮罩层 E -->
    <!-- 操作 S -->
    <div class="bottom-opeation">
      <div @click="cancel">{{otherText}}</div>
      <div @click="confirm">{{confirmText}}</div>
    </div>
    <!-- 操作 E -->
  </div>
</template>

<script lang="ts">
export default ({
  props: {
    // 图片的url
    imgUrl: {
      type: String,
      default: ''
    },
    // 剪裁框默认宽度
    cropWidth: {
      type: Number,
      default: 260
    },
    // 剪裁框默认长度
    cropHeight: {
      type: Number,
      default: 260
    },
    // 取消操作文案
    otherText: {
      type: String,
      default: '取消'
    },
    // 确定操作文案
    confirmText: {
      type: String,
      default: '确定'
    },
    // 可以压缩图片宽高  默认不超过200
    maxImgSize: {
      type: [Number, String],
      default: 2000
    },
    // 输出格式
    outputType: {
      type: String,
      default: 'png'
    },
    // 上传图片按照原始比例显示
    original: {
      type: Boolean,
      default: false
    },
    // 截图框能否超过图片
    centerBox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imgs: '', // 图片链接
      // 容器高宽
      w: 0,
      h: 0,
      // 图片缩放比例
      scale: 1,
      // 图片偏移x轴
      x: 0,
      // 图片偏移y轴
      y: 0,
      cutTop: 0, // 遮罩层上和下的高度
      cutLeft: 0, // 左侧和右侧的宽度
      // 图片加载
      loading: true,
      // 图片真实宽度
      trueWidth: 0,
      // 图片真实高度
      trueHeight: 0,
      // 移动的x
      moveX: 0,
      // 移动的y
      moveY: 0,
      // 开启截图
      crop: false,
      // 正在截图
      cropping: false,
      // 裁剪框大小
      cropW: 0,
      cropH: 0,
      // 支持的滚动事件
      support: '',
      // 移动端手指缩放
      touches: [],
      touchNow: false,
      // 图片旋转
      rotate: 0,
      isIos: false,
      orientation: 0,
      // 图片缩放系数
      coe: 0.2,
      // 初始图片的位置
      initX: 0,
      initY: 0
    }
  },
  mounted () {
    this.support =
      'onwheel' in document.createElement('div') ? 'wheel' : 'DOMMouseScroll'
    var u = navigator.userAgent
    this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    // 判断传入的imgUrl是否正常
    this.checkedImg()
  },
  methods: {
    /**
     * @function 判断图片的长短，同时判断图片是否需要缩放以及缩放比例，将图片放置到中间位置
     */
    checkedImg () {
      if (this.imgUrl === null || this.imgUrl === '') {
        this.imgs = ''
        return
      }
      this.loading = true
      this.scale = 1
      this.rotate = 0
      let img = new Image()
      img.onload = () => {
        let width = img.width
        let height = img.height
        console.log(img.width, img.height, 'img-img')
        this.imgs = this.imgUrl
        let max = this.maxImgSize
        // 如果图片长度大于最长长度的限制，则等比将高缩放
        if (width > max) {
          height = (height / width) * max
          width = max
        }
        // 如果图片长度大于最长长度的限制，则等比将高缩放
        if (height > max) {
          width = (width / height) * max
          height = max
        }
      }
      img.onerror = () => {
        this.$emit('imgLoad', 'error')
      }
      // 判断如果不是base64图片 再添加crossOrigin属性，否则会导致iOS低版本(10.2)无法显示图片
      if (this.imgUrl.substr(0, 4) !== 'data') {
        img.crossOrigin = ''
      }
      img.src = this.imgUrl
    },
    // reload 图片布局函数
    reload () {
      let img = new Image()
      img.onload = () => {
        // 读取图片的信息原始信息， 解析是否需要旋转
        // 读取图片的旋转信息
        // 得到外层容器的宽度高度
        this.w = parseFloat(
          window.getComputedStyle(this.$refs.fsCropper).width
        )
        this.h = parseFloat(
          window.getComputedStyle(this.$refs.fsCropper).height)

        // 存入图片真实高度
        this.trueWidth = img.width
        this.trueHeight = img.height
        console.log(this.trueWidth, 'this.trueWidth', this.trueHeight)
        // 判断是否需要压缩大图
        if (!this.original) {
          // 判断布局方式 mode
          if (this.trueWidth > this.w) {
            // 如果图片宽度大于容器宽度
            this.scale = this.w / this.trueWidth
          }

          if (this.trueHeight * this.scale > this.h) {
            this.scale = this.h / this.trueHeight
          }
          this.scale = this.checkedMode()
        } else {
          this.scale = 1
        }
        this.$nextTick(() => {
          this.initX = (this.w - this.trueWidth) / 2
          this.initY = (this.h - this.trueHeight) / 2
          this.loading = false
          // 剪裁框布局
          this.getCutSize()
        })
      }
      img.onerror = () => {
        // this.$emit('imgLoad', 'error')
        // this.$emit('img-load', 'error')
      }
      img.src = this.imgs
    },
    // 背景布局的函数
    checkedMode () {
      let scale = 1
      if (this.trueWidth > this.w) {
        // 如果图片宽度大于容器宽度
        scale = this.w / this.trueWidth
      }

      if (this.trueHeight * scale > this.h) {
        scale = this.h / this.trueHeight
      }
      if (this.trueHeight * scale < this.cropHeight) {
        scale = this.cropHeight / this.trueHeight
      }
      if (this.trueWidth < this.cropWidth) {
        scale = this.cropWidth / this.trueWidth
      }
      if (this.trueHeight < this.cropHeight) {
        scale = this.cropHeight / this.trueHeight
      }
      return scale
    },
    /**
     * @function 获取截图框
     */
    getCutSize () {
      this.cutTop = (this.h - this.cropHeight) / 2
      this.cutLeft = (this.w - this.cropWidth) / 2
    },
    // 当按下鼠标键
    startMove (e) {
      // e.preventDefault()
      // 开始移动
      this.moveX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.x
      this.moveY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.y
      if (e.touches) {
        window.addEventListener('touchmove', this.moveImg, { passive: false })
        window.addEventListener('touchend', this.leaveImg, { passive: false })
        if (e.touches.length === 2) {
          // 记录手指刚刚放上去
          this.touches = e.touches
          window.addEventListener('touchmove', this.touchScale, { passive: false })
          window.addEventListener('touchend', this.cancelTouchScale, { passive: false })
        }
      } else {
        window.addEventListener('mousemove', this.moveImg)
        window.addEventListener('mouseup', this.leaveImg)
      }
    },
    // 移动图片
    moveImg (e) {
      e.preventDefault()
      if (e.touches && e.touches.length === 2) {
        this.touches = e.touches
        window.addEventListener('touchmove', this.touchScale)
        window.addEventListener('touchend', this.cancelTouchScale)
        window.removeEventListener('touchmove', this.moveImg)
        return false
      }
      let nowX = e.clientX ? e.clientX : e.touches[0].clientX
      let nowY = e.clientY ? e.clientY : e.touches[0].clientY

      let changeX, changeY
      changeX = nowX - this.moveX
      changeY = nowY - this.moveY
      this.$nextTick(() => {
        if (this.centerBox) {
          let dx = (this.cutLeft - (this.w - this.trueWidth * this.scale) / 2) / this.scale
          let dy = (this.cutTop - (this.h - this.trueHeight * this.scale) / 2) / this.scale
          changeX = Math.min(changeX, dx)
          changeX = Math.max(changeX, -dx)
          changeY = Math.min(changeY, dy)
          changeY = Math.max(changeY, -dy)
        }
        this.x = changeX
        this.y = changeY
      })
      this.x = changeX
      this.y = changeY
    },
    // 移动图片结束
    leaveImg (e) {
      window.removeEventListener('mousemove', this.moveImg)
      window.removeEventListener('touchmove', this.moveImg)
      window.removeEventListener('mouseup', this.leaveImg)
      window.removeEventListener('touchend', this.leaveImg)
    },
    // 移动端缩放
    touchScale (e) {
      e.preventDefault()
      let scale = this.scale
      // 记录变化量
      // 第一根手指
      var oldTouch1 = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      }
      var newTouch1 = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
      // 第二根手指
      var oldTouch2 = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      }
      if (e.touches.length === 2) {
        var newTouch2 = {
          x: e.touches[1].clientX,
          y: e.touches[1].clientY
        }
        var oldL = Math.sqrt(
          Math.pow(oldTouch1.x - oldTouch2.x, 2) +
            Math.pow(oldTouch1.y - oldTouch2.y, 2)
        )
        var newL = Math.sqrt(
          Math.pow(newTouch1.x - newTouch2.x, 2) +
            Math.pow(newTouch1.y - newTouch2.y, 2)
        )
        var cha = newL - oldL
        // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
        // 1px - 0.2
        var coe = 1
        coe =
          coe / this.trueWidth > coe / this.trueHeight
            ? coe / this.trueHeight
            : coe / this.trueWidth
        coe = coe > 0.1 ? 0.1 : coe
        var num = coe * cha
        if (!this.touchNow) {
          this.touchNow = true
          if (cha > 0) {
            scale += Math.abs(num)
          } else if (cha < 0) {
            scale = scale > Math.abs(num) ? (scale -= Math.abs(num)) : scale
          }
          this.touches = e.touches
          setTimeout(() => {
            this.touchNow = false
          }, 8)
          if (this.centerBox) {
            if (this.trueWidth * scale < this.cropWidth || this.trueHeight * scale < this.cropHeight) {
              return false
            }
            let dx = (this.cutLeft - (this.w - this.trueWidth * scale) / 2) / scale
            let dy = (this.cutTop - (this.h - this.trueHeight * scale) / 2) / scale
            if (this.scale > scale && (dx < this.x || -dx > this.x || dy < this.y || -dy > this.y)) return false
            this.scale = scale
          } else {
            this.scale = scale
          }
        }
      }
    },
    // 获取截图框的坐标轴
    getCropAxis () {
      let obj = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }
      obj.x1 = this.cutLeft
      obj.x2 = obj.x1 + this.cropWidth
      obj.y1 = this.cutTop
      obj.y2 = obj.y1 + this.cropHeight
      return obj
    },
    /**
     * @function 裁剪图片，返回base64
     */
    getCropChecked (cb) {
      let canvas = document.createElement('canvas')
      // let canvas = document.getElementById('canvasID')
      // canvas.toDataURL('image/png')
      let img = new Image()
      let rotate = this.rotate
      let trueWidth = this.trueWidth
      let trueHeight = this.trueHeight
      img.onload = () => {
        if (this.cropWidth !== 0) {
          let ctx = canvas.getContext('2d')
          let dpr = 1
          if (!this.full) {
            dpr = window.devicePixelRatio
          }
          console.log(dpr, 'dpr')
          // let width = this.cropWidth * dpr
          // let height = this.cropHeight * dpr
          let width = this.cropWidth
          let height = this.cropHeight
          let imgW = trueWidth * this.scale * dpr
          let imgH = trueHeight * this.scale * dpr
          // 图片x轴偏移
          // let dx =
          //   (this.x - this.cutLeft + (this.trueWidth * (1 - this.scale)) / 2) *
          //   dpr

          // let dx = this.cutLeft / this.scale
          // console.log('++++++++', this.x, this.cutLeft, this.trueWidth, this.scale, dpr, dx)
          // 图片y轴偏移
          // let dy =
          //   (this.y - this.cropHeight + (this.trueHeight * (1 - this.scale)) / 2) *
          //   dpr
          // let dy = 0
          // console.log('++++++++', this.y, this.cropHeight, this.trueHeight, this.scale)
          console.log(this.x, this.cutLeft, this.initX)
          let dx = (this.cutLeft - (this.w - this.trueWidth * this.scale) / 2) / this.scale - this.x
          // 图片y轴偏移
          let dy = (this.cutTop - (this.h - this.trueHeight * this.scale) / 2) / this.scale - this.y
          // 保存状态
          setCanvasSize(width, height)
          console.log(this.cutLeft, this.cropHeight, this.x, this.y, '1-1-1-1-1-1-1-1')
          // 保存状态
          // setCanvasSize(width, height)
          // console.log(canvas.width, canvas.height, 'height-----')
          // console.log(this.cutLeft, this.cropHeight, this.x, this.y, '9090909090909')
          // ctx.save()
          switch (rotate) {
            case 0:
              if (!this.full) {
                console.log('++++++++', img.width, img.height)
                console.log(dx, dy, this.cropWidth / this.scale, this.cropHeight / this.scale, 0, 0, this.cropWidth, this.cropHeight)
                ctx.drawImage(img, dx, dy, this.cropWidth / this.scale, this.cropHeight / this.scale, 0, 0, this.cropWidth, this.cropHeight)
                // ctx.drawImage(img, dx, 0, this.cropWidth / this.scale, this.cropHeight / this.scale, 0, 0, this.cropWidth, this.cropHeight)
              } else {
                // 输出原图比例截图
                setCanvasSize(width / this.scale, height / this.scale)
                ctx.drawImage(
                  img,
                  dx / this.scale,
                  dy / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                )
              }
              break
            case 1:
            case -3:
              if (!this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2
                dy = dy + (imgH - imgW) / 2
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                ctx.drawImage(img, dy, -dx - imgH, imgW, imgH)
              } else {
                setCanvasSize(width / this.scale, height / this.scale)
                // 换算图片旋转后的坐标弥补
                dx =
                  dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2
                dy =
                  dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                ctx.drawImage(
                  img,
                  dy,
                  -dx - imgH / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                )
              }
              break
            case 2:
            case -2:
              if (!this.full) {
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                ctx.drawImage(img, -dx - imgW, -dy - imgH, imgW, imgH)
              } else {
                setCanvasSize(width / this.scale, height / this.scale)
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                dx = dx / this.scale
                dy = dy / this.scale
                ctx.drawImage(
                  img,
                  -dx - imgW / this.scale,
                  -dy - imgH / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                )
              }
              break
            case 3:
            case -1:
              if (!this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2
                dy = dy + (imgH - imgW) / 2
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                ctx.drawImage(img, -dy - imgW, dx, imgW, imgH)
              } else {
                setCanvasSize(width / this.scale, height / this.scale)
                // 换算图片旋转后的坐标弥补
                dx =
                  dx / this.scale + (imgW / this.scale - imgH / this.scale) / 2
                dy =
                  dy / this.scale + (imgH / this.scale - imgW / this.scale) / 2
                ctx.rotate((rotate * 90 * Math.PI) / 180)
                ctx.drawImage(
                  img,
                  -dy - imgW / this.scale,
                  dx,
                  imgW / this.scale,
                  imgH / this.scale
                )
              }
              break
            default:
              if (!this.full) {
                ctx.drawImage(img, dx, dy, imgW, imgH)
              } else {
                // 输出原图比例截图
                setCanvasSize(width / this.scale, height / this.scale)
                ctx.drawImage(
                  img,
                  dx / this.scale,
                  dy / this.scale,
                  imgW / this.scale,
                  imgH / this.scale
                )
              }
          }
          // ctx.save()
          // ctx.restore()
        } else {
          let width = trueWidth * this.scale
          let height = trueHeight * this.scale
          let ctx = canvas.getContext('2d')
          ctx.save()
          switch (rotate) {
            case 0:
              setCanvasSize(width, height)
              ctx.drawImage(img, 0, 0, width, height)
              break
            case 1:
            case -3:
              // 旋转90度 或者-270度 宽度和高度对调
              setCanvasSize(height, width)
              ctx.rotate((rotate * 90 * Math.PI) / 180)
              ctx.drawImage(img, 0, -height, width, height)
              break
            case 2:
            case -2:
              setCanvasSize(width, height)
              ctx.rotate((rotate * 90 * Math.PI) / 180)
              ctx.drawImage(img, -width, -height, width, height)
              break
            case 3:
            case -1:
              setCanvasSize(height, width)
              ctx.rotate((rotate * 90 * Math.PI) / 180)
              ctx.drawImage(img, -width, 0, width, height)
              break
            default:
              setCanvasSize(width, height)
              ctx.drawImage(img, 0, 0, width, height)
          }
          ctx.restore()
        }
        cb(canvas)
      }
      // 判断图片是否是base64
      var s = this.imgUrl.substr(0, 4)
      if (s !== 'data') {
        img.crossOrigin = 'Anonymous'
      }
      img.src = this.imgs
      console.log(this.imgs, 'imgs----')
      function setCanvasSize (width, height) {
        canvas.width = Math.round(width)
        canvas.height = Math.round(height)
      }
    },
    /**
     * @function 确定操作
     */
    confirm () {
      this.getCropChecked(data => {
        console.log('this.outputType', this.outputType, this.outputSize, data)
        let urlData = data.toDataURL('image/' + this.outputType, this.outputSize)
        this.$emit('confirmAction', urlData)
        console.log(data.toDataURL('image/' + this.outputType, this.outputSize))
      })
    },
    /**
     * @function 取消操作
     */
    cancel () {
      this.$emit('cancelAction')
    }
  },
  watch: {
    imgUrl () {
      // 当传入图片时, 读取图片信息同时展示
      console.log('img-change')
      this.checkedImg()
    },
    imgs (val) {
      if (val === '') {
        return
      }
      this.reload()
    }
  }
})
</script>
<style lang="scss" scoped>
.clipping-bg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;
}
.display-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.mask-content-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-layer {
  background: rgba(0,0,0,.5);
}
.content-layer {
  display: inline-block;
}
.content-layer-middle {
  position: relative;
  span {
    position: absolute;
    display: inline-block;
    background: white;
    &:nth-child(1) {
      top: 0;
      left: -2px;
      width: 4px;
      height: 16px;
    }
    &:nth-child(2) {
      top: -2px;
      left: 0;
      width: 16px;
      height: 4px;
    }
    &:nth-child(3) {
      top: -2px;
      right: 0;
      width: 16px;
      height: 4px;
    }
    &:nth-child(4) {
      top: 0;
      right: -2px;
      width: 4px;
      height: 16px;
    }
    &:nth-child(5) {
      right: -2px;
      bottom: 0;
      width: 4px;
      height: 16px;
    }
    &:nth-child(6) {
      right: 0;
      bottom: -2px;
      width: 16px;
      height: 4px;
    }
    &:nth-child(7) {
      bottom: -2px;
      left: 0;
      width: 16px;
      height: 4px;
    }
    &:nth-child(8) {
      bottom: 0;
      left: -2px;
      width: 4px;
      height: 16px;
    }
  }
}
.bottom-opeation {
  z-index: 999;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  div {
    padding: 0 14px 10px;
    color: white;
    font-size: 17px;
  }
}
</style>
