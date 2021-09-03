<template>
  <div class="dome" id="app">
      <!-- <img :src="require('@/assets/logo.png')"></img> -->
      <div class="cropper">
          <img :src="img" class="img" />
          <!-- option是配置，格式是对象，getbase64Data是组件的一个方法获取裁剪完的头像 -->
          <h5-cropper :option="option" ref="cropper" hide-input @getbase64="getbase64Data" @getblob="getBlob" @get-file="getFile"></h5-cropper>
      </div>


      <div class="up-wrap">
        这是可点区域
        <input class="upload" type="file" name="img" @change="chnage">
      </div>
  </div>
</template>

<script>
import H5Cropper from "vue-cropper-h5";
export default {
  components: { H5Cropper },
  data() {
    return {
      option: {
        autoCropWidth: 100,
        fixedBox: false,
        fixed: false,
        canMoveBox: true,
        canMove: false,
        info: true
      }, //配置
      img: "https://xcxcdn.shuiqoo.cn/100huodao.png"
    };
  },
  methods: {
    chnage({target}){
        this.$refs.cropper.loadFile(target.files[0])
        target.value = ''
    },
    getbase64Data(data) {
        this.img = data
    },
    getBlob(blob){
        console.log(blob)
    },
    getFile(file) {
        console.log(file)
    }
  }
};
</script>

<style scoped>
  .up-wrap{
    width: 100%;
    height: 150px;
    line-height: 150px;
    background-color: #01FF70;
    margin-top: 20px;
    position: relative;
  }
  .upload{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
.dome {
  height: 500px;
  background-color: #006600;
}
.cropper {
  width: 100%;
  height: 500px;
  /* 切记position: relative一定要有 */
  position: relative;
}
.img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

</style>
