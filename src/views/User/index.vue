<template>
  <div class="my">
    <scroll
      :data="scrollData"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      ref="list"
      class="scroll-list "
    >

      <div>
        <div
          class="my-info"
          :class="'theme-img_'+$store.state.styleColor"
        >

          <img
            @click="updateUserInfo"
            v-if='resData'
            :src="resData.userInfo.photo"
          >

          <div @click="updateUserInfo">
            <div
              v-if='resData'
              id="nickName"
            >{{resData.userInfo.nickName}}</div>
            <div
              id="know-time"
              v-if="resData&&resData.day==0"
            >我们刚认识哦</div>
            <div
              id="know-time"
              v-else-if='resData'
            >我们相识{{resData.day}}天啦</div>
          </div>

        </div>

        <ul
          class='my-cel'
          v-if='resData'
        >

          <li @click="activate=true">
            <div>
              <i
                class='iconfont icon-weixingongzhonghaogu'
                :style='{"color":"#10C339"}'
              ></i>公众号{{$store.userCash}}
            </div>
            <i class='mint-toast-icon mintui  mintui-back'></i>
          </li>
          <li @click.stop="$router.push({path:'/coupon'})">
            <div>
              <i
                class='iconfont icon-yhq-'
                :style="{color:'#2868f0'}"
              ></i>优惠劵
            </div>
            <div>
              <span v-if='resData.discounts.codeNum>0'>{{resData.discounts.codeNum}}</span>
              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li>
          <li @click='$router.push({path:"/purse"})'>
            <div>

              <i
                class='iconfont icon-hongbao-'
                :style="{color:'#f54847'}"
              ></i>
              现金红包</div>
            <div>
              <span v-if='resData.discounts.userMoney>0'>￥{{resData.discounts.userMoney}}</span>
              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li>
          <li
            v-if='resData.discounts'
            @click='$router.push({path:"/myBean"})'
          >
            <div>

              <i
                class='iconfont icon-qd'
                :class="['icon_'+$store.state.styleColor]"
              ></i>
              我的趣豆</div>
            <div>
              <div v-if='resData.discounts.integral.surplus_integral>0'>
                <span >
                  {{resData.discounts.integral.surplus_integral}}
                </span>
                <img
                  src='@/assets/dov@2x.png'
                  class='doc'
                />
              </div>

              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li>
          <!-- <li @click='goHome'>
            <div>

              <i
                class='iconfont icon-my-lipin'
                :style="{color:'#eb6692'}"
              ></i>
              我的礼品</div>
            <div>
              <span v-if='resData.discounts.isDraw'>您有礼品未领取</span>
              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li> -->
          <li
            @click='goIed'
               v-if='resData.LEDTest'
          >
            <div>

              <!-- <i class='iconfont icon-my-lipin'
                 :style="{color:'#eb6692'}"></i> -->
              LED广告发布</div>
            <div>

              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li>
          <li @click='goAddress'>
            <div>
              <i
                class='iconfont icon-zu4'
                :style="{color:'#FEC400'}"
              ></i>
              我的地址</div>
            <div>
              <i class='mint-toast-icon mintui  mintui-back'></i>
            </div>

          </li>
        </ul>
      </div>
    </scroll>
    <attention :data='attentionData' v-model='activate' />
    <popCash v-model='isPopCash'></popCash>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox } from 'mint-ui'
import { findUserInfo, updateUserInfo, findVendorConfig } from '@/api'
import Scroll from '@/components/Scroll/'
export default {
  data() {
    return {
      resData: '',
      scrollData: [],
      activate: false,
      popupVisible: false,
      isPopCash: false,
      attentionData: null
    }
  },
  components: {
    attention: () => import('@/components/Attention'),
    popCash: () => import('@/views/Home/popCash'),
    Scroll
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.getFindFindUserInfo()
    this.findVendorConfig();
  },
  mounted() {
    this.$refs.list.$el.style.top = 0
  },
  methods: {
    findVendorConfig(){
      findVendorConfig().then(res=>{
         console.log(11111,res)
         let  {vendorConfig}=res
         this.attentionData=vendorConfig;
      })
    },
    goHome() {
      this.$router.push({ path: '/', query: { classId: -1 } })
    },
    goAddress(){
       this.$router.push({ path: '/address' })
    },
    goIed() {
      this.$router.push({ path: '/Led' })
      // MessageBox.prompt('IED广告语','设置').then(
      //   ({ value, action }) => {
      //     console.log(value);
      //     downAdvertingToVendor({
      //       content:""
      //     })

      //   }
      // )
    },
    tiao() {
      this.$router.push({ path: '/order' })
    },
    getFindFindUserInfo() {
      this.loading.open('加载中...')
      findUserInfo().then(res => {
        if (res) {
          this.resData = res
          this.scrollData = [res]
        }
        this.loading.close()
      })
    },

    updateUserInfo() {
      let vueThis = this
      MessageBox.confirm('更新用户信息?').then(action => {
        updateUserInfo().then(res => {
          this.getFindFindUserInfo()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/mixin.scss';
.my {
  line-height: 42px;
}
.my-info {
  height: 246px;
  width: 100%;
  @include fjc(center, flex-start);
  img {
    margin-left: 30px;
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }
  > div {
    padding-left: 30px;
    #nickName {
      font-size: 34px; /*px*/
      color: #030303;
      padding-bottom: 10px;
      text-align: left;
      letter-spacing: -0.82px;
    }
    #know-time {
      font-size: 24px; /*px*/
      color: #333;
      letter-spacing: 0;
    }
  }
}
.my-cel {
  li {
    height: 96px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    @include border-bottom;

    > div {
      @include fjc;
      font-size: 28px; /*px*/
      i {
        position: relative;
        top: -4px;
        font-size: 45px;
      }
    }
    > i {
      font-size: 26px;
      transform: rotate(-180deg);
      color: #999;
    }
    > div:nth-child(1) {
      i {
        margin-right: 18px;
      }
    }
    > div:nth-child(2) {
      @include fjc;
      > i {
        font-size: 26px;
        transform: rotate(-180deg);
        color: #999;
        margin-left: 10px;
        margin-top: 5px;
      }

      > div {
        @include fjc;
        .doc {
          width: 35px;
          margin-left: 15px;
        }
      }
    }
  }
  > li:first-child {
    margin: 13px 0;
  }
  > li:last-child {
    margin: 13px 0 0;
  }
  li:last-child,
  li:first-child {
    &::before {
      border: none;
    }
  }
}
</style>
