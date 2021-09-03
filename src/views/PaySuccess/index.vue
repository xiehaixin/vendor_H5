<template>
  <div class="paySuccess">
    <div
      class="my-contant"
      v-if="payDoor != -1"
    >
      <div class="con-top">
        <div>
          <span> {{ payDoor }}</span>
          柜门已开，请及时提取并掩藏矿洞！
        </div>
      </div>
      <div class="cont-middel">
        <div>
          <img
            v-if="gzData"
            @click.stop="activateRepair = !activateRepair"
            :src="gzData.doorImg.picUrl"
            alt=""
          />
        </div>
        <!-- <div class='help'>
          <div class='title'
               v-if='principalData'>本店掌柜：{{principalData.account[0].name}}</div>
          <div class='endorsement'>
            <img src="@/assets/img-zgd@2x.png"
                 alt="">

            <div>
              <div @click="activateRepair=!activateRepair">
                开不了门?点我
              </div>
              <div @click="activateRepair=!activateRepair">
                遇到问题,呼我
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="success-ui" v-if="payDoor == -1">
      <div class="suc-wrap">
        <img
          src="@/assets/success@2x.png"
          alt=""
        />
        <div class="text-1">
          支付成功
        </div>
        <div class="text-2">
          请及时取走您购买的商品
        </div>
      </div>
    </div>
    <scroll
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :bounce="bounce"
      :beforeScroll="true"
      ref="list"
      class="scroll-list my-scroll-list "
    >
      <div class="scroll-wrap">
     
        <div
          class="repair"
          v-show="!upMove&&payDoor!=-1"
          @click="activateRepair = !activateRepair"
            
        >
             <a  >
          <span> 开箱遇到问题？</span>
          <i class="mint-toast-icon mintui  mintui-back"></i>
                 </a>
        </div>
    
        <div
          class="repair"
          v-if="payDoor==-1"
        >
                <a :href="'tel:'+tel">
          <span>
     
             咨询客服</span>
          <i class="mint-toast-icon mintui  mintui-back"></i>
                </a>
        </div>
        <evaluate
          @submit="_submitEvaluate"
          @close="_closeMove"
          :disable="isCompleteEvaluate"
          v-model="upMove"
        ></evaluate>
      </div>
    </scroll>

    <div
      class="cont-bottom"
      v-show="!upMove"
    >
      <div @click="goHome">返回首页</div>
        <div @click="goHomeBuy">继续购买</div>
      <div
        @click="activateAtt = !activateAtt"
        :class="['theme_' + $store.state.styleColor]"
      >
        关注公众号
      </div>
    </div>
    <!-- 关注公众号 -->
    <attention v-model="activateAtt"></attention>
    <!-- 维修人信息 -->
    <repair v-model="activateRepair"></repair>
    <!-- 答题 -->
    <answer v-if="isDT"></answer>

    <!-- 下单送现金 -->
    <popCash
      v-model="isPopCash"
      @help="cashShowRepair"
      :type="2"
    ></popCash>
  </div>
</template>
<script>
import evaluate from './evaluate'
import answer from './answer'
import { Toast } from 'mint-ui'
import Scroll from '@/components/Scroll/'
import {
  findContainerImg,
  againUnlocking,
  findUserCheck,
  findAccountByMainboardNoMD5,
  insertOrderEvaluate
} from '@/api'
export default {
  data() {
    return {
      tel:0,
      isPopCash: true, //自动调用现金
      activateAtt: false,
      activateRepair: false,
      payDoor: '', //柜号
      payOrderId: '', //订单id
      payOrderNo: '', //订单编号
      gzData: '', //柜子信息
      upMove: false, //评价初始化
      isDT: '', //是否弹出答题
      isCompleteEvaluate: false
    }
  },
  watch: {
    upMove(n) {
      if (n) {
        console.log(this.$refs.list)
        let that = this
        setTimeout(() => {
          that.$refs.list.scrollToElement('p', 200)
          that.$refs.list.disable()
        }, 100)
      }
    }
  },
  components: {
    attention: () => import('@/components/Attention'),
    repair: () => import('@/components/Repair'),
    evaluate,
    Scroll,
    answer: () => import('./answer'),
    popCash: () => import('@/views/Home/popCash')
  },
  created() {
    this.probeType = 1
    this.listenScroll = true
    this.bounce = false
    this.init()
  },
  mounted() {
    this.isPopCash = true
    //parseFloat(getComputedStyle(window.document.documentElement)['font-size']) * 12.5 + 'px';
    this.$refs.list.$el.style.top = '64%'

    // let that = this;
    // setTimeout(() => {
    //   that.$refs.list.scrollToElement('p', 500);

    // }, 500);
  },
  methods: {
    /**获取柜门信息 */
    init() {
      this.payOrderId = localStorage.getItem('payOrderId') || 681
      this.payOrderNo =
        localStorage.getItem('payOrderNo') || 1901101414261370002101851
      this.payDoor = localStorage.getItem('payDoor') || 16
      this.getGZimg()
      this.getAnswer()
      if(this.payDoor==-1){
        findAccountByMainboardNoMD5().then(res=>{
          this.tel=res.account[0].phone
        })
      }
    },
    getGZimg() {
      findContainerImg({
        doorIndex: this.payDoor
      }).then(res => {
        this.gzData = res
      })
    },
    /**获取是否弹出答题 */
    getAnswer() {
      if (/AlipayClient/.test(window.navigator.userAgent)) {
        this.isDT = false
      } else {
        findUserCheck().then(res => {
          this.isDT = res.topics.length > 0
          // this.isDT = false;
        })
      }
    },

    /**提交评价 */
    _submitEvaluate(data) {
      this.loading.open('加载中...')
      insertOrderEvaluate({
        orderId: this.payOrderId,
        serviceEvaluateId: data.oneClick,
        productEvaluateId: data.twoClick,
        evaluateContent: data.introduction,
        starNum: data.starNum
      }).then(res => {
        this.loading.close()
        this.$refs.list.enable()
        this.upMove = false
        this.isCompleteEvaluate = true
        Toast({
          message: '评价成功',

          duration: 2000
        })
      })
    },
    cashShowRepair() {
      this.activateRepair = true
    },
    /**去订单页 */
    goHome() {
      this.$router.replace('/')
    },
    goHomeBuy(){
       this.$router.replace({
          name: 'index',
          params: {
            buy:true  
          }
        })
    },
    _closeMove() {
      let that = this
      console.log(this.$refs.list)
      this.$refs.list.scrollTo(0, 0, 500)

      let timer = setTimeout(() => {
        that.upMove = false
        clearTimeout(timer)
      }, 500)
    }
  },
  activated() {
 
    if (this.gzData) {
      this.isPopCash = true
      this.init()
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.repair {
  border-bottom: 12px solid rgba(248, 248, 248, 1);
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.16);
 
  @include border-top;
 
  background: #fff;
  padding: 0 24px;
  font-size: 28px; /*px*/
  a{
      height: 88px;
     @include fjc(center, space-between);
    text-decoration: none;
    color:#111;
  }
  i {
    transform: rotate(-180deg);
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
  .text-2 {
    margin-top: 87px;
    color: #636363;
    font-size: 28px;
  }
}
.paySuccess {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  z-index: 2;
  background: #fff;
  padding: 32px 0;
  box-sizing: border-box;
  .con-top {
    @include fjc(flex-end, center);
    div {
      font-size: 28px; /*px*/
      padding: 24px 0;
      span {
        color: $color-red;
      }
    }
  }
  .cont-middel {
    > div:first-child {
      min-height: 504px;
      img {
        width: 348px;
        margin: 0px 0 48px 0;
      }
    }

    .help {
      width: 500px;
      margin: auto;
      .title {
        @include color111;
        text-align: left;
        padding-left: 40px;
        padding-bottom: 32px;
      }
      .endorsement {
        display: flex;
        justify-content: center;
        img {
          height: 248px;
          width: auto;
          margin: 0;
        }
        > div {
          padding-top: 38px;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            height: 64px;
            min-width: 206px;
            position: relative;
          }
          > div:first-child {
            background: #e24a4a;
            margin-bottom: 32px;
            &::after {
              position: absolute;
              left: -16px;
              bottom: 0;
              content: '';

              border: 30px solid transparent;
              border-bottom: 19px solid #e24a4a;
            }
          }
          > div:nth-child(2) {
            background: #4a90e2;
            &::after {
              position: absolute;
              left: -16px;
              bottom: 0;
              content: '';

              border: 30px solid transparent;
              border-bottom: 19px solid #4a90e2;
            }
          }
        }
      }
    }
  }
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
}
.my-scroll-list > div {
  padding: 0;
}
</style>
