<template>
  <div class="pay-result">
    <div class="success-ui">
      <div class="suc-wrap">
        <img src="@/assets/fail.png" alt="" />
        <div class="text-1">未支付订单提交失败</div>
      </div>
    </div>
    <div
      class="cont-bottom"
    >
      <div @click="goHome">返回首页</div>
      <div
        @click="goOrders"
        :class="['theme_' + $store.state.styleColor]"
      >
        查看订单
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    /**去首页 */
    goHome() {
      this.$router.replace('/')
    },
    goOrders(){
      this.$router.replace('/orderOnline')
    }
  }
};
</script>

<style lang="scss">
@import '@/common/scss/mixin.scss';
.pay-result {
  .cont-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding-bottom: env(safe-area-inset-bottom);
    @include fjc(center, space-around);
    font-size: 28px; /*px*/
    > div {
      flex:1;
      height: 88px;
      @include fjc;
      color: #fff;
      box-sizing: border-box;
    }
    > div:first-child,>div:nth-child(2) {
      border-top: 1px solid #ddd;
      color: #979797;
    }
    >div:nth-child(2){
        border-left: 1px solid #ccc;
    }
  }
  .success-ui {
    .suc-wrap {
      padding: 132px 0 32px !important;
      img {
        width: 128px;
      }
    }

    .text-1 {
      margin-top: 47px;
      color: #333333;
      font-size: 36px;
    }
  }
}
</style>
