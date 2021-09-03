<template>
  <transition name="fade"
              v-if='visible'>
    <div class="attention"
         :value="value">
      <div class='myCont'>
        <div class='header-img'>
          <img src="@/assets/img-zgd@2x.png"
               alt="">
        </div>
        <div class='title'>
          趣掌柜提示
        </div>
        <div class='desc'>尊敬的矿泉驿站会员，关注水趣公众号，更多优惠即将开启！</div>
        <div class='code-er'>
          <img src="@/assets/shuiqoo.png"
               alt="二维码">
        </div>
        <div class='ft-des'>
          长按关注，或保存相册扫一扫
        </div>
      </div>
      <div class='close-x'>
        <img :src="require('@/assets/datiTuOff.png')"
             @click='close'
             alt="关闭">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      visible: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value (val) {
      this.visible = val;
    },
    visible (val) {
      this.$emit('input', val);
    }
  },
  methods: {
    close () {
      this.visible = false;
    }

  },
  mounted () {
    if (this.value) {
      this.visible = true;
    }
  },

}
</script>

<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.attention {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  @include fjc;
  flex-flow: row wrap;
  align-content: center;
  .myCont {
    @include fjc;
    flex-flow: row wrap;
    width: 654px;
    background: #fff;
    position: relative;
    border-radius: 16px;
    .header-img {
      position: absolute;
      background: #fff;
      transform: translate(-50%, -50%);
      top: 0%;
      left: 50%;
      width: 124px;
      height: 124px;
      border-radius: 100%;
      box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.16);
      @include fjc;
      img {
        width: 81px;
      }
    }
    .title {
      padding: 94px 0 24px;
      font-size: 32px; /*px*/
    }
    .desc {
      font-size: 28px; /*px*/
      padding: 0 30px;
      line-height: 45px;
      text-align: left;
    }
    .code-er {
      padding: 18px 0 12px;
      width: 100%;
      img {
        width: 320px;
        height: 320px;
      }
    }
    .ft-des {
      font-size: 28px; /*px*/
      padding-bottom: 48px;
    }
  }
  .close-x {
    width: 100%;
    img {
      padding: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>