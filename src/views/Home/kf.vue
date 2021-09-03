<template>
  <transition
    name="fade"
    v-if='visible'
  >
    <div
      class="attention"
      :value="value"
    >
      <div class='myCont'>
        <div class='title'>在线客服</div>
        <div class='code-er'>
          <img
            :src="url"
            alt="二维码"
          >
        </div>
        <div>
         长按识别，联系在线客服
        </div>

        <div class='close-x'>
          <img
            :src="require('@/assets/datiTuOff.png')"
            @click='close'
            alt="关闭"
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: false
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.attention {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  @include fjc;
  .myCont {
    position: relative;
    @include fjc;
    flex-flow: row wrap;
    background: #fff;
    width: 600px;
    border-radius: 8px;
    padding: 30px 0;
    .title {
      font-size: 32px; /*px*/
      font-weight: 600;
    }
    > div {
      width: 100%;
      color: #666666;
    }
    .code-er {
      width: 320px;
      height: 320px;
      img {
        width: 100%;
      }
    }
    > div:nth-child(2) {
      font-size: 32px; /*px*/
      padding: 28px 0;
    }

    .close-x {
      position: absolute;
      bottom: -150px;
      left: 50%;
      transform: translate(-50%, 0);
      img {
        padding: 50px;
        width: 56px;
        height: 56px;
      }
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