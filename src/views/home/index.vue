<template>
  <div class="home">
    <div>
      <input type="file" accept="image/*" @change="upphoto($event)">
      <fs-img-clipping v-if="imgUrl" :imgUrl="imgUrl" @confirmAction="confirmAction" @cancelAction="cancelAction">default</fs-img-clipping>
      <img class="img-style" :src="newImg" alt="">
    </div>

    <div style="margin-top:150px; border:1px solid red; height: 40px;">
      <h5-cropper :option="option"
                @getbase64Data="getbase64Data"
                @getblobData="getblobData"
                @getFile="getFile" />
    </div>
    <div>
      <img :src="img" alt="" style="width: 100px;">
    </div>
  </div>
</template>

<script>
import ImgClipping from './component/fsImgClipping'
import H5Cropper from 'vue-cropper-h5'
export default {
  name: 'home',
  components: {
    FsImgClipping: ImgClipping,
    H5Cropper
  },
  data () {
    return {
      imgUrl: '',
      newImg: '',
      img: '',
      option: {
        ceilbutton: false, // 顶部按钮，默认底部
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式,默认png
        info: false, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: false, // 是否默认生成截图框
        autoCropWidth: 0, // 默认生成截图框宽度
        autoCropHeight: 0, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        fixedBox: true, // 固定截图框大小 不允许改变
        canMove: true, // 上传图片是否可以移动
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 2000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '100%', // 图片默认渲染方式
        cancelButtonText: '取消', // 取消按钮文本
        confirmButtonText: '确定', // 确定按钮文本
        cancelButtonBackgroundColor: '#606266', // 取消按钮背景色
        confirmButtonBackgroundColor: '#ed594c', // 确定按钮背景色
        cancelButtonTextColor: '#ffffff', // 取消按钮字体色
        confirmButtonTextColor: '#ffffff' // 确定按钮字体色
      } // 配置
    }
  },
  methods: {
    // 选择照片
    async upphoto (e) {
      console.log('h5-upphoto')
      let photourl = e.target.files[0]
      console.log(photourl, 'photourl')
      if (photourl !== undefined) {
        this.$emit('imgorigoinf', photourl)
        this.imgUrl = await this.onloadimg(photourl)
        console.log(this.img, 'this.img')
        // this.config.autoCrop = true
      }
    },
    // 异步onload图片
    onloadimg (photourl) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        reader.readAsDataURL(photourl)
        reader.onload = e => {
          resolve(e.target['result'])
        }
      })
    },
    confirmAction (data) {
      console.log(data, '1111')
      this.newImg = data
      this.imgUrl = ''
    },
    cancelAction () {
      this.newImg = ''
      this.imgUrl = ''
    },
    getbase64Data (data) {
      console.log(data, 'data---')
      this.img = data
    },
    getblobData (e) {
      console.log(e, 'eeeeeeee')
    },
    getFile (info) {
      console.log(info, 'infoinfo')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.img-style {
  border: 1px solid red;
}
</style>
