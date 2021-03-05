<template>
  <div class="home">
    <div>
      <input type="file" accept="image/*" @change="upphoto($event)">
      <fs-img-clipping v-if="imgUrl" :imgUrl="imgUrl" @confirmAction="confirmAction" @cancelAction="cancelAction">default</fs-img-clipping>
      <img :src="newImg" alt="">
    </div>
  </div>
</template>

<script>
import ImgClipping from './component/fsImgClipping'

export default {
  name: 'home',
  components: {
    FsImgClipping: ImgClipping
  },
  data () {
    return {
      imgUrl: '',
      newImg: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
