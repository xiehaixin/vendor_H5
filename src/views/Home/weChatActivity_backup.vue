<template>
  <div class="home-activity" v-if="visible">
    <div class="coupon-wrap" v-if="showCoupon">
      <div class="close-coupon" @click="close"><img src="@/assets/actvityClose@2x.png" alt="" /></div>
      <div class="content"><img :src="activityHintPic" alt="" /></div>
      <div class="button-wrap">
        <button @click="refuse()" class="refuse">拒绝</button>
        <button @click="choose()" class="choose">领优惠</button>
      </div>
    </div>
    <div class="qr-wrap" v-if="showQr">
      <div class="code-er"><img :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + ticket" alt="" /></div>
      <div class="intro">长按图片【识别二维码】关注公众号领优惠券</div>
      <div class="close-coupon" @click="closeQr"><img src="@/assets/actvityClose@2x.png" alt="" /></div>
    </div>
  </div>
</template>
<script>
import { findWeChatActivity, weChatActivityRecord } from '@/api';
export default {
  data() {
    return {
      showQr: false,
      showCoupon: false,
      visible: false, //关闭弹窗,
      activityHintPic: '',
      activityName: '',
      ticket: ''
    };
  },
  props: {
    value: {},
    // 售货机是否有异常
    abnormal: false
  },
  watch: {
    value(val, old) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('inpit', val);
    },
    abnormal(val, old) {
      if (val) {
        this.visible = false;
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 获取活动
    async init() {
      const data = await findWeChatActivity();
      //const data = "";
     /* const data = {
        activityHintPic: 'http://sq.shuiqoo.cn/Upload/images/20200427/200427133217521132.png',
        activityName: '元旦送礼',
        activityShowPic: 'http://sq.shuiqoo.cn/Upload/images/20200427/200427133223687439.png',
        ticket: 'gQFp8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyT2NVcndsb1RmazAxWGY3Zk51Y2wAAgTP_qdeAwQAjScA'
      }; */
      if (data && !this.abnormal) {
        this.showCoupon = true;
        this.visible = true;
        this.activityHintPic = data.activityHintPic;
        this.ticket = data.ticket;
      }
    },
    async refuse() {
      await weChatActivityRecord({
        type: 0
      });
      this.close();
    },
    async choose() {
      await weChatActivityRecord({
        type: 1
      });
      this.close();
      this.showCoupon = false;
      this.visible = true;
      this.showQr = true;
    },
    close() {
      this.visible = false;
    },
    closeQr() {
      this.showQr = false;
      this.showCoupon = true;
      this.visible = false;
    }
  }
};
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.home-activity {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  .content {
    max-width: 672px;
    padding-top: 0;
    padding-bottom: 30px;
    img{
      width: 100%;
    }
  }
  .button-wrap {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 150px;
    width: 400px;
    button {
      width: 200px;
      height: 80px;
      @include fjc;
    }
    .refuse {
      background: #dfdedc;
      color: #8b8b8b;
    }
    .choose {
      background: #fb7e09;
      color: #fff;
    }
  }
  .close-coupon {
    margin-top: 62px;
    margin-bottom: 6px;
    padding-left: 90%;
    img {
      width: 60px;
    }
  }
}
.qr-wrap {
  .code-er {
    width: 320px;
    height: 320px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .intro{
    font-size: 32px;
    padding: 28px 0;
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  .close-coupon {
    margin-top: 62px;
    padding-left: 0;
  }
}
</style>
