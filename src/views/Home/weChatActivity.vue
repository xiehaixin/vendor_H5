<template>
  <div class="home-activity" v-if="visible">
    <div v-if="showCoupon" class="coupon-wrap" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="close-coupon" @click="close"><img src="@/assets/actvityClose@2x.png" alt="" /></div>
      <ul>
        <li v-for="(item, index) in couponList" :key="index">
          <div class="left">
            <div class="price">￥{{ item.exchange_money }}</div>
            <div class="type">优惠券</div>
          </div>
          <div class="right">
            <div class="name">{{ item.typeName }}</div>
            <div v-if="item.validateDay" class="time">有效期：{{ item.validateDay }} 天</div>
            <div v-else-if="item.beginDate" class="time">有效期：<p>{{ sliceDate(item.beginDate) }} ~ {{ sliceDate(item.endDate) }}</p></div>
          </div>
        </li>
      </ul>
      <div class="button-wrap">
        <div class="get-coupon"><img @click="choose" src="@/assets/getcoupon@2x.png" alt=""></div>
        <div class="refuse-wrap"><i @click="refuse">忍痛拒绝</i></div>
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
      bgImg: require('@/assets/activitybg@2x.png'),
      activityHintPic: '',
      activityName: '',
      ticket: '',
      couponList: []
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
        ticket: 'gQFp8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyT2NVcndsb1RmazAxWGY3Zk51Y2wAAgTP_qdeAwQAjScA',
        beginTime: '2020-03-30 00:00:00',
        createTime: '2020-04-27 13:32:11',
        creator: '18598251875',
        eid: 1,
        endTime: '2020-05-31 00:00:00',
        roleDescUrl: 'http://sq.shuiqoo.cn/Upload/files/20200430/200430144841297967.html',
        state: 1,
        coupon: [
          {
            beginDate: null,
            codeTypeId: 58,
            createTime: '2020-04-27 14:48:36',
            creator: '18598251875',
            detailId: 1,
            eid: 1,
            endDate: null,
            exchange_money: 5,
            giveNum: 3,
            leftNum: 998,
            pictureUrl: 'http://sq.shuiqoo.cn/Upload/images/20191017/191017132342621822.jpg',
            publishNum: 1000,
            sendNum: 2,
            typeName: '优惠分享5元券-补运费',
            validateDay: 6
          },{
            beginDate: null,
            codeTypeId: 58,
            createTime: '2020-04-27 14:48:36',
            creator: '18598251875',
            detailId: 1,
            eid: 1,
            endDate: null,
            exchange_money: 10,
            giveNum: 3,
            leftNum: 998,
            pictureUrl: 'http://sq.shuiqoo.cn/Upload/images/20191017/191017132342621822.jpg',
            publishNum: 1000,
            sendNum: 2,
            typeName: '优惠分享10元券-补运费',
            validateDay: 10
          },{
            beginDate: null,
            codeTypeId: 58,
            createTime: '2020-04-27 14:48:36',
            creator: '18598251875',
            detailId: 1,
            eid: 1,
            endDate: null,
            exchange_money: 8,
            giveNum: 3,
            leftNum: 998,
            pictureUrl: 'http://sq.shuiqoo.cn/Upload/images/20191017/191017132342621822.jpg',
            publishNum: 1000,
            sendNum: 2,
            typeName: '优惠分享8元券-补运费',
            validateDay: 8
          },
          {
            beginDate: '2020-04-28 00:00:00',
            codeTypeId: 55,
            createTime: '2020-04-27 14:48:36',
            creator: '18598251875',
            detailId: 2,
            eid: 1,
            endDate: '2020-05-30 00:00:00',
            exchange_money: 5,
            giveNum: 3,
            leftNum: 998,
            pictureUrl: 'http://sq.shuiqoo.cn/Upload/images/20190917/190917133910786874.JPG',
            publishNum: 1000,
            sendNum: 2,
            typeName: '国庆礼券',
            validateDay: 0
          }
        ]
      }; */
      this.couponList = data.coupon;

      if (data && this.couponList.length && !this.abnormal) {
        this.showCoupon = true;
        this.visible = true;
        this.ticket = data.ticket;
      }
    },
    async refuse() {
      await weChatActivityRecord({
        type: 0
      });
      this.showCoupon = false;
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
    },
    sliceDate(fulltime) {
      return fulltime.slice(0,10);
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
  .coupon-wrap {
    width: 672px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 300px;
    padding-bottom: 20px;
    position: relative;
    ul {
      height: 360px;
      padding: 0 126px 0;
      overflow-y: scroll;
      li {
        background: #FFE9DC;
        display: flex;
        border-radius: 10px;
        color: #512E2E;
        min-height: 105px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        &:last-child {
          margin: 0;
        }
        .left {
          flex-basis: 30%;
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
          padding: 10px 0;
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
    .button-wrap{
      margin: 10px auto;
      width: 400px;
      .get-coupon img{
        width: 100%;
      }
      .refuse-wrap{
        text-align: center;
        margin-top: 10px;
        i{
          color: #fff;
          text-decoration: underline;
        }
      }
    }

  }

  .close-coupon {
    position: absolute;
    top: 0;
    right: 10px;
    img {
      width: 60px;
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
      position: relative;
      right: auto;
      margin-top: 62px;
      padding-left: 0;
    }
  }
}
</style>
