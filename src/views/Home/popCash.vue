<template>
  <div class='cash'>
    <shade v-model='popupVisible'
           class='tabcal'
           v-if='type==1&&resData&&resData.userMoney>0'>
      <div class='content'>
        <div class='header'>
          我等到花儿都谢了!
        </div>
        <div class='body'>
          <img src="@/assets/img-hbbg@2x.png"
               alt="">
          <div class="my-layout">
            <div> ￥{{resData.userMoney}}元</div>
            <div>
              现金红包
            </div>
            <div>
              仅剩 <span>{{rockonArr.hour}}</span>:<span>{{rockonArr.min}}</span>:<span>{{rockonArr.sec}}</span>
            </div>
            <div @click.stop='popupAtt=true,popupVisible=false'>
              去钱包取现
            </div>
            <div @click.stop='abnegate'>
              忍痛放弃
            </div>
          </div>
        </div>
        <div class='foooter'
             @click.stop='popupVisible=false'>
          <img src="@/assets/datiTuOff.png"
               alt="">
        </div>

      </div>
    </shade>
    <shade v-model='popupVisible'
           v-else-if='resData.orderRedPacketMoney'>
      <div class='order-cont'>

        <div class='header'
             v-if='resData.orderRedPacketMoney'>
          下单成功！意外获得{{resData.orderRedPacketMoney.redpackMoney}}元现金
        </div>
        <div class='white-body'
             v-if='resData.orderRedPacketMoney'>
          <div>
            ￥{{resData.orderRedPacketMoney.redpackMoney}}元
          </div>
          <div>
            现金红包
          </div>
          <div>
            仅剩 <span>{{rockonArr.hour}}</span>:<span>{{rockonArr.min}}</span>:<span>{{rockonArr.sec}}</span>
          </div>
          <div @click.stop='popupAtt=true,popupVisible=false'>
            去钱包提现
          </div>
          <div @click.stop='abnegate'>
            忍痛放弃
          </div>
        </div>
        <div class='help'
             @click.stop='help'>
          <span>开箱遇到问题？</span>
          <i class='iconfont icon-qianjin'></i>
        </div>
        <div class='foooter'
             @click.stop='popupVisible=false'>
          <img src="@/assets/datiTuOff.png"
               alt="关闭按钮">
        </div>
      </div>
    </shade>
    <shade v-model='popupAtt'
           class='pop-Att'>

      <div class='my-con'>
        <div>
          <img src="@/assets/img-wxzc@2x.png"
               alt="">
        </div>
        <div class='white-con'>
          <div>

            红包可累计<br />
            超<span>1</span>元公众号自动发送

          </div>
          <div>
            <img :src='qrcordUrl'
                 v-if='qrcordUrl' />
            <img src="@/assets/shuiqoo.png"
                 v-else
                 alt="">
          </div>
          <div>
            长按二维码关注公众号
          </div>
        </div>
        <div class='foooter'
             @click.stop='popupAtt=false'>
          <img src="@/assets/datiTuOff.png"
               alt="关闭按钮">
        </div>
      </div>
    </shade>

  </div>
</template>
<script>
import { findUserRedPacketMoney, recordUserAbandonRedPacket, findOrderRedPacket, findRedPackCode } from '@/api'
import { computeDown } from '@/common/js/dom'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      popupVisible: false,
      popupAtt: false,
      resData: '',
      rockonArr: [],
      timer: '',
      qrcordUrl: '',//二维码
    }

  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    }
  },
  watch: {
    value (val) {
      this.popupVisible = val;
      if (val && this.type == 1) {
        this.getFindUserRedPacketMoney();
      } else if (val && this.type == 2) {
        this.getFindOrderRedPacket();
      }
    },
    popupVisible (val) {
      this.$emit('input', val);
      if (!val) {
        clearInterval(this.timer);
      }
    },
  },
  mounted () {


    if (this.value && this.type == 1) {
      this.getFindUserRedPacketMoney();
    } else if (this.value && this.type != 1) {

      this.getFindOrderRedPacket();
    }
    this.getFindRedPackCode();
  },
  components: {

  },
  methods: {
    /**首页弹出 */
    getFindUserRedPacketMoney () {
      findUserRedPacketMoney().then(res => {

        if (res.tag == 1 && res.userMoney >= 1 && res.clearSecord > 0) {
          this.resData = res;
          this.popupVisible = true;
          this.setUserCash(true);
          this._countDown(res.clearSecord);

        } else if (this.$route.name == 'user') {
          this.popupVisible = false;
          this.popupAtt = true;
        }
      })
    },
    /**下单完成后 */
    getFindOrderRedPacket () {

      findOrderRedPacket({
        orderId: localStorage.getItem("payOrderId")
      }).then(res => {

        if (res.orderRedPacketMoney && res.orderRedPacketMoney.redpackMoney > 0 && res.orderRedPacketMoney.clearSecord > 0) {
          this.resData = res;
          this.popupVisible = true;
          this.setUserCash(true);
          this._countDown(res.orderRedPacketMoney.clearSecord);
        }

      })
    },
    _countDown (remaining) {
      if (remaining > 0) {
        this.timer = setInterval(() => {
          remaining -= 1;
          this.rockonArr = computeDown(remaining);
          if (remaining < 0) {
            clearInterval(this.timer);
            tomer = null;
          }
        }, 1000);
      }
    },
    getFindRedPackCode () {
      findRedPackCode().then(res => {
        if (res) {
          this.qrcordUrl = res.qrcordUrl;
        }
      })

    },
    abnegate () {
      recordUserAbandonRedPacket().then(res => {
        this.popupVisible = false;
      })
    },
    help () {
      this.popupVisible = false;
      this.$emit('help', )
    },
    ...mapMutations({
      setUserCash: "POP_CASH",

    })
  },


}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';

$red: #e24a4a;
$yellow: #f9d600;
.tabcal {
  height: calc(100% - 100px) !important;
  height: calc(100% - 100px - env(safe-area-inset-bottom)) !important;
}
.content {
  .header {
    color: $yellow;
    font-size: 28px; /*px*/
  }
  .body {
    position: relative;
    img {
      width: 671px;
    }
    .my-layout {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      > div:first-child {
        padding-top: 156px;
        font-size: 48px; /*px*/
        color: $red;
        font-weight: 600;
      }
      > div:nth-child(2) {
        padding-top: 12px;
        font-size: 24px; /*px*/
        color: $red;
      }
      > div:nth-child(3) {
        @include color111;
        @include fjc;
        padding: 80px 0 113px;
        span {
          @include fjc;
          background: $red;
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin: 0 5px;
          font-size: 24px; /*px*/
        }
      }
      > div:nth-child(4) {
        width: 400px;
        height: 88px;
        background: linear-gradient(
          90deg,
          rgba(250, 101, 71, 1) 0%,
          rgba(239, 64, 108, 1) 100%
        );
        border-radius: 4px;
        color: #fff;
        @include fjc;
        margin: auto;
      }
      > div:nth-child(5) {
        width: 400px;
        height: 88px;
        @include fjc;
        margin: auto;
        color: #fff;
      }
    }
  }
  .foooter {
    padding-top: 32px;
    img {
      width: 54px;
    }
  }
}
.order-cont {
  .header {
    color: $yellow;
    padding-bottom: 32px;
  }
  .white-body {
    background: #fff;
    width: 572px;
    > div:first-child {
      padding-top: 64px;
      font-size: 48px; /*px*/
      color: $red;
      font-weight: 600;
    }
    > div:nth-child(2) {
      padding-top: 12px;
      font-size: 24px; /*px*/
      color: $red;
    }
    > div:nth-child(3) {
      @include color111;
      @include fjc;
      padding: 64px 0 80px;
      span {
        @include fjc;
        background: $red;
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin: 0 5px;
        font-size: 24px; /*px*/
      }
    }
    > div:nth-child(4) {
      width: 400px;
      height: 88px;
      background: linear-gradient(
        90deg,
        rgba(250, 101, 71, 1) 0%,
        rgba(239, 64, 108, 1) 100%
      );
      border-radius: 4px;
      color: #fff;
      @include fjc;
      margin: auto;
    }
    > div:nth-child(5) {
      width: 400px;
      height: 88px;
      @include fjc;
      margin: auto;
      color: #979797;
      padding-bottom: 44px;
    }
  }
  .foooter {
    padding-top: 32px;
    img {
      width: 54px;
    }
  }
}
.help {
  @include fjc(center, space-between);
  padding: 0 30px;
  margin-top: 10px;
  height: 88px;
  background: #fff;
  font-size: 26px; /*px*/
  i {
    font-size: 26px; /*px*/
  }
}
.pop-Att {
  .my-con {
    width: 534px;
    > div:first-child {
      padding-bottom: 24px;
      img {
        width: 100%;
      }
    }
    .white-con {
      background: #fff;
      border-radius: 4px;
      div:first-child {
        padding: 32px;
        color: $red;
        font-size: 28px; /*px*/
        line-height: 48px;
        span {
          font-size: 32px; /*px*/
        }
      }
      > div:nth-child(2) {
        img {
          width: 320px;
        }
      }
      > div:last-child {
        font-size: 28px; /*px*/
        padding: 16px 0 32px;
      }
    }
    .foooter {
      padding-top: 32px;
      img {
        width: 54px;
      }
    }
  }
}
</style>
