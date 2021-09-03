<template>
  <div class="home-coupon" v-if="visible">
    <div class="content" :style="{ backgroundImage: `url(${bgImg})` }" @click="draw">
      <ul>
        <li v-for="(item, index) in dataList.coupons" :key="index">
          <div class="left">
            <div class="price">￥{{ item.exchange_money }}</div>
            <div class="type">优惠券</div>
          </div>
          <div class="right">
            <div class="name">{{ item.typeName }}</div>
            <div class="time">有效期：{{ item.endDate }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="close-coupon" @click="close"><img src="@/assets/close@2x.png" alt="" /></div>
  </div>
</template>
<script>
import { couponActivitySelect, couponAcquire } from '@/api';
export default {
  data() {
    return {
      // bgImg: require('@/assets/com_bg@2x.png'),
      bgImg: '',
      visible: false, //关闭弹窗,
      dataList: []
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
    // 获取优惠券
    async init() {
      this.dataList = await couponActivitySelect();
      if (this.dataList && this.dataList.coupons.length && !this.abnormal) {
        this.visible = true;
        this.bgImg = this.dataList.coupons[0].picUrl;
      }
    },
    async draw() {
      let data = await couponAcquire();
      this.$router.push({ path: '/coupon' });
      this.close();
    },
    close() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.home-coupon {
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
    width: 672px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 258px;
    padding-bottom: 170px;
    ul {
      height: 360px;
      padding: 0 126px 0;
      overflow-y: scroll;
      li {
        background: #feceb1;
        display: flex;
        border-radius: 10px;
        color: #a73130;
        min-height: 105px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        &:last-child {
          margin: 0;
        }
        .left {
          flex-basis: 35%;
          .price {
            font-size: 38px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .type {
            font-size: 24px;
          }
        }
        .right {
          flex: 1;
          text-align: left;
          .name {
            font-size: 28px;
            margin-bottom: 16px;
            @include textLeng(1);
          }
          .time {
            font-size: 24px;
            @include textLeng(1);
          }
        }
      }
    }
  }
  .close-coupon {
    margin-top: 62px;
    img {
      width: 60px;
    }
  }
}
</style>
