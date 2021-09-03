<template>
  <div class="home">
    <notify :data="notifyList" v-if="notifyList && notifyList.broadcasts.length" ref="refsNotify" />
    <my-Header ref="bgImage" />
    <sidebar ref="sidebar" v-if="classData" @change="sidebarChange2" v-model="classId" :isGif="resData.isGift" :classData="classData" />
    <scroll :data="goodsList" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :bounce="false" ref="list" class="scroll-list  scroll-min ">
      <div>
        <!-- <sidebar
          ref="sidebar"
          v-if='classData'
          @change='sidebarChange'
          v-model='classId'
          :isGif="resData.isGift"
          :classData='classData'
        /> -->

        <transition name="fade">

          <div class="list-wrap">
            <div v-if="tabClass == 1 && goodsList.length" :class="styleCode == 1 ? 'two-col' : ''">
              <div v-if="styleCode == 2" class="item-wrap" v-for="(item, index) in goodsList" :key="index">
                <item ref="listItem" :item="item" :resData="resData" @change="buyChange" @show="_getItemDetail" />
              </div>
              <div v-if="styleCode == 1" class="common-item-wrap" v-for="(citem, cindex) in goodsList" :key="cindex">
                <sitem ref="listsItem" :item="citem" :resData="resData"  @change="buyChange" @show="_getItemDetail" />
              </div>

            </div>
            <div v-if="tabClass == 1 && !goodsList.length" class="no-data">
              <img width="187px" height="152px" src="@/assets/tcsm.png" alt="" />
              <p>暂无商品</p>
            </div>
            <div v-if="tabClass == 2 && singleProducts.length" class="two-col">
              <div class="common-item-wrap" v-for="(citem, cindex) in singleProducts" :key="cindex">
                <citem ref="listcItem" :item="citem"  @change="buyChange" @show="_getItemDetail" />
              </div>
            </div>
            <div v-if="tabClass == 2 && !singleProducts.length" class="no-data">
              <img width="187px" height="152px" src="@/assets/tcsm.png" alt="" />
              <p>暂无商品</p>
            </div>
            <div v-if="tabClass == 3" class="no-data">
              <img width="187px" height="152px" src="@/assets/tcsm.png" alt="" />
              <p>建设中…</p>
            </div>
            <div v-if="tabClass == 4" class="no-data">
              <img width="187px" height="152px" src="@/assets/dzsm.png" alt="" />
              <p>建设中…</p>
            </div>
            <!-- 无产品展示 -->
            <!-- <div class="no-product" v-show="resData && !goodsList.length">
              <img src="@/assets/nobox@2x.74a1419.png" alt="" />
              <div>没有商品哦，去其他分类看看吧</div>
              <div @click="sidebarChange2('')">所有商品</div>
            </div> -->
          </div>

          <!-- 回调为空 -->
          <!-- <div class="list-wrap" v-else-if="resData">
            <div class="empty">
              <div>抱歉！没有找到您要的信息</div>

              <div>
                <button :class="['theme_' + $store.state.styleColor]" @click.stop="allGoods">{{ step }}s返回</button>
              </div>
            </div>
          </div> -->
        </transition>
        <div class="pad-bottom"></div>
      </div>
    </scroll>
    <product-detail :isShow="isShowDetail" :item="itemDetailData" @change="clickDetailBuy"></product-detail>
    <pop-buy :styleCode="styleCode" :pop="respond" :isActivity="resData.isActivity" :buyItem="buyItem" :surplus_integral="surplus_integral" :to_use_sum="to_use_sum"></pop-buy>
    <!-- 现金红包 -->
    <pop-cash v-model="isPopCash" v-if="!visibleDT"></pop-cash>

    <div class="not-initiated" v-if="abnormal">
      <div><img src="@/assets/err_img.png" alt="" /></div>
      <div ref="errText" class="text">
        设备 : {{ resData.mainboardNo }} {{ abnormalText }}
        <img :src="require('@/assets/cry@2x.png')" />
        <br />
        <!-- <p>亲，可到隔壁村订购（1栋~6栋都有水趣驿站）</p> -->
        <p>亲，可到本小区其他水趣驿站订购</p>
      </div>
    </div>
    <dt-attention v-model="visibleDT"></dt-attention>
    <div><kf-template v-model="showKf" :url="linkUlrData ? linkUlrData.customerServerUrl : ''"></kf-template></div>
    <!-- 关注公众号-->
    <attention  :data="attentionData" v-model="activateGZH" />
    <!-- 优惠券 -->
    <coupon :abnormal="abnormal"></coupon>
    <!-- 公司微信活动 -->
    <weChatActivity :abnormal="abnormal"></weChatActivity>
    <!-- 关注公众号 -->
    <attention :data="attentionData" v-model="activate" />
    <equalize v-model="showAnimated" v-if="awardedData && awardedData.compensateIntegralProducts.length"></equalize>
  </div>
</template>

<script>
// @ is an alias to /src

import Scroll from '@/components/Scroll/';
import { prefixStyle } from '@/common/js/dom';
import { init } from '@/common/js/globalJs.js';
import {
  findContainers,
  findProductClass,
  findVendorBroadcast,
  vendorLoginfind,
  payWxConfig,
  findNotAgainUnlockngOrder,
  getGroupBuyUrlAndCustomerServerUrl,
  againUnlocking,
  findCompensateIntegralProduct,
  recordCompensateIntegralProduct,
  findVendorConfig,
  findSingleProducts
} from '@/api';
import { mapMutations } from 'vuex';
import { MessageBox, Toast } from 'mint-ui';

import item from './item';
import kfTemplate from './kf';
import dtAttention from '@/components/AttDT';
import attention from '@/components/Attention';
import myHeader from './myHeader';
import coupon from './coupon';
import weChatActivity from './weChatActivity';
// import { clearInterval } from 'timers'

let transform = prefixStyle('transform');

export default {
  data() {
    return {
      showAnimated: false,
      awardedData: '', //漏水补偿积分数据
      activate: false,
      showRegister: false,
      showKf: false,
      btnDisable: true,
      resData: '',
      classData: '',
      activateGZH: false,
      visibleDT: this.$route.query.isEvaluate ? true : false,
      goodsList: [],
      isPopCash: true, //是否启动现金弹出
      scrollY: 0,
      respond: false,
      buyItem: '',
      isShowDetail: false,
      itemDetailData: '',
      abnormal: false, //柜子异常显示
      abnormalText: '', //错误语言
      notifyList: '', //系统通知
      domTitle: '',
      isShowIframe: true,
      classId: '' ,//选中的分类
      tabClass: 1,
      singleProducts: [],
      lastBuyCabinet: '', //十分钟内再次扫码提示再次开门柜门
      linkUlrData: '',
      step: 5,
      styleCode: 1,
      surplus_integral: 0, // 用户积分
      to_use_sum: 0 ,// 1积分能抵扣的金额,
      attentionData: null
    };
  },

  components: {
    Scroll,
    attention,
    myHeader,
    //sidebar: () => import('./sidebar'),
    sidebar: () => import('./sidebar2'),
    item: () => import('./item'),
    citem: () => import('./cItem'),
    sitem: () => import('./sItem'),
    popCash: () => import('./popCash'),
    popBuy: () => import('./popBuy'),
    productDetail: () => import('./productDetail'),
    notify: () => import('./notify'),
    attention: () => import('@/components/Attention'),
    equalize: () => import('@/components/equalize'),
    dtAttention,
    kfTemplate,
    coupon,
    weChatActivity
  },
  watch: {
    scrollY(newVal) {
      let scale = 1;
      let zIndex = 0;
      let blur = 0;
      let percent = Math.abs(newVal / this.imageHeight);
      //console.log('percent:',percent);
      if (newVal > 0) {
        scale = 1 + percent;
        zIndex = 10;
        this.$refs.bgImage.$el.style['filter'] = 'none';
      } else {
        blur = Math.min(20 * percent, 20);
        this.$refs.bgImage.$el.style['filter'] = `blur(${blur}px)`;
        this.$refs.bgImage.$el.style['webkit-flter'] = `blur(${blur}px)`;
      }
      this.$refs.bgImage.$el.style.zIndex = zIndex;
      if(percent > 0.5){
        this.$refs.bgImage.$el.style.position = 'fixed';
      }else{
        this.$refs.bgImage.$el.style.position = 'relative';
      }
    },

    domTitle(n) {
      document.title = n;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.findVendorConfig();
    this.getFindContainers(); //商品列表
    this.getfindProductClass(); //分类列表
    this.getNotify(); //系统通知
    this.getIsVip(); //获取用户信息 判断贵宾
    this.getPayParames(); //获取支付参数
    this.getIsTwoCode(); //进入判断十分钟是否再次开门
    this.getlinkUrl();
  },
  // 计算获取背景图片高度 设置scroll的偏移值
  updated() {
    let fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size']);
    this.$nextTick(function() {

      this.imageHeight = this.$refs.bgImage.$el.clientHeight;
      //this.imageHeight = 4.266667 * fontSize;

      let totalheight = Number(this.imageHeight)  + 75;
      console.log('img:' + totalheight);
      let that = this;
      this.$refs.list.$el.style.top = totalheight + 'px'; //`${4.266667 * fontSize}px`
      this.btnDisable = false;
    });
  },
  methods: {
    findVendorConfig(){
      findVendorConfig().then(res=>{
         console.log(11111,res)
         let  {vendorConfig}=res
         this.attentionData=vendorConfig;
         localStorage.setItem('styleCode', res.vendorConfig.styleCode);
         //首页展示卡片式或双列
         this.styleCode = res.vendorConfig.styleCode;
         console.log('styleCode:',this.styleCode);
      })
    },
    /*获取用户是否存在赔偿 */
    getCompensateFor() {
      findCompensateIntegralProduct().then(res => {
        let { compensateIntegralProducts, register } = res;
        let that = this;
        if (compensateIntegralProducts.length) {
          this.awardedData = res;
          if (!register) {
            MessageBox({
              title: '提示',
              message: `您有一笔赔偿，需要注册后可领取！`,
              showCancelButton: true,
              confirmButtonText: '前往注册',
              cancelButtonHighlight: true
            }).then(action => {
              if (action === 'confirm') {
                that.$router.push({
                  path: '/register',
                  query: {
                    url: this.linkUlrData.registerPoster
                  }
                });
              }
            });
          } else {
            MessageBox({
              title: '抱歉',
              message: `您在${compensateIntegralProducts[0].createTime}购买的${
                compensateIntegralProducts[0].productName
              }产品因质量原因，给您造成的损失表示深切的道歉，我们给您赔付${compensateIntegralProducts[0].compensateIntegral}积分用于您再次购买，谢谢！`,
              showCancelButton: false,
              confirmButtonText: '领取积分',
              cancelButtonHighlight: true
            }).then(action => {
              if (action === 'confirm') {
                this.showAnimated = true;
                recordCompensateIntegralProduct({
                  orderId: compensateIntegralProducts[0].orderId
                });
              }
            });
          }
        }
      });
    },
    getIsTwoCode() {
      findNotAgainUnlockngOrder().then(res => {
        if (res.notAgainUnlockngOrder.length) {
          MessageBox({
            title: '提示',
            message: `您上次购买${res.notAgainUnlockngOrder[0].doorIndex}号柜门是否未开门，确认再次开启？`,
            showCancelButton: true,
            confirmButtonText: '再次开箱',
            cancelButtonHighlight: true
          }).then(action => {
            if (action === 'confirm') {
              againUnlocking({
                orderId: res.notAgainUnlockngOrder[0].orderId,
                doorIndex: res.notAgainUnlockngOrder[0].doorIndex
              }).then(res => {
                if (res > -1) {
                  Toast({
                    message: '请求已发送',
                    position: 'middle',
                    duration: 2000
                  });
                }
              });
            }
          });
        }
      });
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    /**商品分类 */
    getfindProductClass() {
      this.classData = [
        {
          classId: 1,
          className: '货架商品'
        },
        {
          classId: 2,
          className: '送货到家'
        },
        {
          classId: 3,
          className: '水票套餐'
        },
        {
          classId: 4,
          className: '定制水'
        }
      ];
    },
    /**系统通知 */
    getNotify() {
      findVendorBroadcast().then(res => {
        if (res) {
          this.notifyList = res;
          if (res.broadcasts.length) {
            let num = parseFloat(this.$refs.list.$el.style.top);
            let nHei = parseFloat(getComputedStyle(window.document.documentElement)['font-size']) * 0.853333;
            this.$refs.list.$el.style.top = num + nHei + 'px';
          }
        }
      });
    },
    /**货柜机数据 */
    getFindContainers() {
      this.getCompensateFor();
      this.loading.open('加载中...');
      let that = this;
      findContainers({ classId: this.classId })
        .then(res => {
          if (!res) {
            return;
          }
          if (!this.domTitle) {
            if (res.containerName) {
              this.domTitle = '' + res.containerName;
            } else {
              this.domTitle = '';
            }
          }
          console.log(res, '货柜数据');
          this.surplus_integral = res.surplus_integral;
          this.to_use_sum = res.to_use_sum;
          this.resData = res;
          this.handlePageData(res);
          this.loading.close();
          //再次购买
          if (this.$route.params.buy) {
            let lastBuyId = localStorage.getItem('lastBuy');
            let { goodsList } = this;
            for (let key of goodsList) {
              if (key.productId == lastBuyId) {
                this.buyChange(key);
                break;
              }
            }
          }
        })
        .catch(function(error) {
          that.loading.close();
        });
    },
    /* 查询送货到家商品 */
    getFindSingleProducts() {
      findSingleProducts()
        .then(res => {
          console.log(res);
          let newpro = [];
          for(let item of res.singleProducts){
            newpro.push({
              picture: item.productPic,
              number: 100,
              productName: item.productName,
              synopsis: item.describe,
              price: item.price,
              productId: item.productId
            });
          }
          this.singleProducts = newpro;

        })
        .catch(error => {
          console.log(error);
        });
    },
    /**获取用户权限 */
    getIsVip() {
      vendorLoginfind().then(res => {
        if (res && res.userInfo) {
          this.setUserInfo(res.userInfo);
        }
        if(res && res.appId){
          sessionStorage.setItem('appId',res.appId);
        }
      });
    },
    /**获取微信支付需要的参数 */
    getPayParames() {
      payWxConfig().then(res => {
        init(res.appId, Number(res.timestamp), res.nonceStr, res.signature);
      });
    },
    /**数据格式处理 */
    handlePageData(data) {
      let list = data.vendorMainboardContainers[0].vendorDoorProucts;
      //异常处理
      if (!data.isOperation) {
        this.abnormal = true; //异常显示
        this.abnormalText = '尚未启动';
      } else if (list) {
        //商品正常销售
        //随便抓取一个商品判断身上的状态
        // 货柜状态：0未激活，后台可以撤回分配；1激活，空闲中；2运行中；3报损中；4补货中

        if (list.length == 0 || list[0].containerStatus == 2) {
          // let bigArr = []
          // let nArr = []
          // if (list.length == 20) {
          //   list.splice(7, 0, { placeholder: true })
          // }
          // for (let i = 0; i < list.length; i++) {
          //   const element = list[i]
          //   nArr.push(list[i])
          //   if ((i + 1) % 3 == 0) {
          //     bigArr.push(nArr)
          //     nArr = []
          //   }
          //   if (list.length % 3 && i == list.length - 1) {
          //     bigArr.push(nArr)
          //   }
          // }

          let filterObj = {};
          let { classId } = this;
          for (let i of Object.keys(list)) {
            let key = list[i];
            if (key.doorStatus === 2 || key.doorStatus === 1) {
              if (classId != -1 && key.isGift && !key.isMyGift) {
                continue;
              }
              if (filterObj[key.productId] && key.doorStatus === 2) {
                filterObj[key.productId].number += 1;
              } else if (!filterObj[key.productId]) {
                filterObj[key.productId] = key;
                filterObj[key.productId].number = key.doorStatus === 2 ? 1 : 0;
              }
            }
          }

          let listArr = [];
          for (let key in filterObj) {
            listArr.push(filterObj[key]);
          }

          listArr.sort((a, b) => {
            return a.sortId - b.sortId;
          });
          let ample = [];
          let sell = [];
          for (let i of Object.keys(listArr)) {
            let key = listArr[i];
            if (!key.price) {
              continue;
            }
            if (key.number <= 0) {
              sell.push(key);
            } else {
              ample.push(key);
            }
          }
          this.goodsList = ample.concat(sell);
          console.log(this.goodsList);

          //水趣有礼自动返回倒计时

          if (listArr.length <= 0 && classId == -1) {
            let me = this;
            clearInterval(me.timer);

            this.timer = setInterval(() => {
              if (me.step <= 0) {
                clearInterval(me.timer);
                me.classId = '';
                me.getFindContainers();
                me.step = 6;
              }
              me.step -= 1;
            }, 1000);
          }
          return;
        } else if (list[0].containerStatus == 3) {
          this.abnormal = true; //异常显示
          this.abnormalText = '正在抢修中。';
        } else if (list[0].containerStatus == 4) {
          this.abnormal = true; //异常显示
          this.abnormalText = '正在补货中，请稍后';
        } else if (list[0].containerStatus == 1) {
          this.abnormal = true; //异常显示
          this.abnormalText = '设备处于空闲状态';
        } else {
          this.abnormal = true; //异常显示
          this.abnormalText = '设备尚未初始化';
        }
        document.getElementsByClassName('my-tab')[0].style.display = 'none';
      }
    },
    /**切换分类 */
    sidebarChange(item) {
      let { groupBuyUrl, isRegisterShuiqoo, customerServerUrl } = this.linkUlrData;
      if (item.classId === -1) {
        this.step = 5;
        if (this.classId === item.classId) {
          this.classId = '';
        } else {
          this.classId = item.classId;
        }
        this.getFindContainers();
      } else if (item.classId === 1) {
        if (!isRegisterShuiqoo) {
          this.$router.push({
            path: '/register',
            query: {
              url: this.linkUlrData.registerPoster
            }
          });
        } else {
          // Toast({
          //   message: '您已注册',
          //   position: 'middle',
          //   duration: 3000
          // })
          this.activate = true;
        }
      } else if (item.classId === 2) {
        if (!customerServerUrl) {
          this.activateGZH = true;
          return;
        }
        this.showKf = true;
      } else if (item.classId === 3) {
        if (!groupBuyUrl) {
          this.activateGZH = true;
          return;
        }
        window.location.href = this.linkUlrData.groupBuyUrl;
      }
    },
    /**切换分类2 */
    sidebarChange2(item) {
      this.tabClass = item.classId;
      if (item.classId === 2) {
        this.getFindSingleProducts();
      }
    },
    /**弹出购买窗口 */
    buyChange(item) {
      if (item.isGift && !item.isMyGift) {
        return MessageBox.alert('亲，礼品已经有主人了，参与水趣公众号在线活动，有机会获得您的礼品', '私人专属礼品');
      }
      if (this.btnDisable) {
        return Toast({
          message: '页面加载中,请稍后重试...',
          position: 'middle',
          duration: 3000
        });
      }
      this.buyItem = item;
      this.respond = !this.respond;
    },
    /**获取菜单链接  拼团购 客服 */
    getlinkUrl() {
      getGroupBuyUrlAndCustomerServerUrl().then(res => {
        this.linkUlrData = res;
      });
    },
    _getItemDetail(item) {
      this.isShowDetail = !this.isShowDetail;
      this.itemDetailData = item;
      console.log(item)
    },
    clickDetailBuy(item) {
      this.buyChange(item);
    },
    allGoods() {
      clearInterval(this.timer);

      this.classId = '';
      this.getFindContainers();
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    })
  },

  activated() {
    if (this.$route.query.classId) {
      this.classId = this.$route.query.classId;
    }
    if (this.resData) {
      document.title = this.domTitle;
      this.getFindContainers();
      this.getlinkUrl();
    }
  }
};
</script>

<style lang="scss">
@import '@/common/scss/mixin.scss';

.home {
  .scroll-min {
    > div {
      min-height: 500px;
      background: $color-background-d;
    }
  }
  .two-col{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .list-wrap {
    padding: 16px 0;
    background: $color-background-d;
    min-height: 300px;
    &::after {
      display: block;
      content: '';
      height: 1px;
      width: 100%;
      clear: both;
    }
    .empty {
      @include fjc;
      flex-flow: column wrap;
      height: 400px;
      button {
        margin-top: 30px;
        padding: 15px 20px;
        border-radius: 8px;
        color: #fff;
      }
    }
    .common-item-wrap,
    .item-wrap {
      position: relative;
      padding: 20px;
      background: #fff;
      margin-bottom: 12px;
      &::after {
        display: block;
        content: '';
        height: 1px;
        width: 100%;
        clear: both;
      }
      .home-item:nth-child(3n + 3) {
        margin-right: 0;
      }
      .frame-row {
        position: absolute;
        bottom: 27px;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 9;
        border-bottom: 12px solid #c7c7c7;
        box-sizing: border-box;
        opacity: 1;
        animation: myOpacity 5s;

        > div {
          background: #e4e4e4;
          height: 48px;
          width: 100%;
          border-radius: 50px 50px 0 0;
        }
      }
    }
    .common-item-wrap{
      width: 44%;
    }

    .no-product {
      padding-top: 150px;
      img {
        width: 220px;
      }
      > div:nth-child(2) {
        color: #979797;
        margin-top: 12px;
        font-size: 24px; /*px*/
      }
      > div:last-child {
        width: 176px;
        height: 64px;
        border: 2px solid rgba(51, 51, 51, 1);
        border-radius: 64px;
        margin: auto;
        line-height: 64px;
        margin-top: 52px;
        font-size: 28px; /*px*/
      }
    }
  }
  .pad-bottom {
    height: 100px;
    width: 100%;
  }
  .not-initiated {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    @include fjc;
    flex-flow: row wrap;
    align-content: center;
    z-index: 30;
    div {
      width: 100%;
      img {
        width: 220px;
      }
    }
    > .text {
      line-height: 44px;
      font-size: 28px; /*px*/
      color: #111;
      p {
        padding-top: 20px;
      }
      img {
        margin-left: 20px;
        width: 60px;
      }
    }
  }
  .no-data{
    color: #C5C6C5;
    font-size: 40px;
    line-height: 2em;
    padding-top: 2em;
  }
}

@keyframes myOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>