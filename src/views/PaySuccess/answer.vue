<template>
  <transition name="fade"
              v-if="isShow">
    <div class='evaluate'>
      <div class="show-banner">
        <img :src="require('@/assets/datiTu.png')"
             @click='goTo'
             alt="">
      </div>
      <div class='close'>
        <img src="@/assets/datiTuOff.png"
             @click='isShow=false'
             alt="关闭">
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      isShow: true,
      clickArr: [
        {}, {}, {}, {}
      ]
    }
  },
  props: {
    data: ''
  },
  methods: {
    goTo () {
      window.location.href = '/funVm/questionsAndAnswers';
    }
  },
}
</script>
<style lang="scss">
@import "@/common/scss/mixin.scss";
.evaluate {
  @include black-wrap-fixed;
  @include fjc;
  flex-flow: row wrap;
  align-content: center;
  .show-banner {
    width: 600px;
    img {
      width: 100%;
    }
  }
  .close {
    width: 100%;

    img {
      width: 50px;
      padding: 30px;
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
