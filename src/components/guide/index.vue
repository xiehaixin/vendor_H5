<template>
  <div class="my-guide"
       v-if='isShow'>
    <mt-swipe :auto="0"
              ref="testSwipe"
              :stopPropagation="true"
              :speed='150'
              :defaultIndex="defaultIndex"
              :continuous='false'>
      <mt-swipe-item>
        <img @click='handleChange'
             src="@/assets/changjing@2x.png"
             alt="">

      </mt-swipe-item>
      <mt-swipe-item> <img @click='handleChange'
             src="@/assets/zhanpinbm@2x.png"
             alt=""></mt-swipe-item>
      <mt-swipe-item>
        <img @click='closeGuide'
             src="@/assets/spmwl@2x.png"
             alt="">
        <div class='accomplish'>

          <div @click='closeGuide'> 完成</div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      defaultIndex: 0,
      isShow: true
    }
  },

  watch: {},
  methods: {
    handleChange (index) {
  
      this.$refs.testSwipe.next()
    },
    closeGuide () {
      this.isShow = false;
    }

  },
  created () { },
  mounted () { },
  destroyed () {
    // 良好的习惯：销毁定时器
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/const.scss";
.my-guide {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .accomplish {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 68px;
    z-index: 3;
    padding-bottom: 50px;
    div {
      margin: auto;
      line-height: 68px;
      text-align: center;
      width: 176px;
      height: 68px;
      background: #fff;
      color: 111;
      border-radius: 8px;
    }
  }
}
</style>