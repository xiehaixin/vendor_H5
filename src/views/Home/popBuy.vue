<template>
  <div class="pop-item">
    <transition name="myfade">
      <div
        class="my-pop"
        v-if="popupVisible"
      >
        <div
          class="black-wrap "
          @click="closeVisible"
        ></div>
        <div class="content-wrap ">
          <div class="content">
            <div class="title">
              订单结算
              <i
                class="iconfont icon-guanbi-copy"
                @click="closeVisible"
              > </i>
            </div>
            <div v-if="styleCode == 1" class="goods-info">
              <div>
                <img
                  :src="buyItem.picture"
                  alt="产品图"
                />
              </div>
              <div class="right-con">
                <div>
                  {{ buyItem.productName }}
                </div>
                <div class="price">
                  <div>￥{{ buyItem.price }}</div>
                  <div>
                    余量
                    <span>{{ buyItem.number }} </span>
                    {{ buyItem.unit || "件" }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="styleCode == 2" class="goods-info2">
              <div>
                <img
                  :src="buyItem.picture"
                  alt="产品图"
                />
              </div>
              <div class="name">
                <div>
                  {{ buyItem.productName }}
                </div>
                <div>
                  余量
                  <span>{{ buyItem.number }} </span>
                  {{ buyItem.unit || "件" }}
                </div>
              </div>
              <div class="price">
                <div><span>￥{{ buyItem.price }}</span></div>
              </div>
            </div>


            <!-- 优惠券与贵宾券 -->
            <div
              class="discounted-price qd-ui"
              v-if="selectDiscount"
            >
              <mt-checklist
                align="right"
                v-model="checkboxdiscounts"
                :options="['1']"
                v-if="checklistSwitch"
              ></mt-checklist>
              <div
                class="rt-con"
                @click="popupVisibleTwo = true"
              >
                <div class="rt-con-module">
                  {{
                  selectDiscount && selectDiscount.code_name == "贵宾价"
                  ? "贵宾价"
                  : " 优惠"
                  }}
                  <div
                    class="biaoshi"
                    v-if="
                      selectDiscount && selectDiscount.code_name != '贵宾价'
                    "
                  >
                    {{
                    selectDiscount.code_name == "随机立减" ||
                    selectDiscount.code_name == "贵宾价"
                    ? selectDiscount.code_name
                    : "优惠劵"
                    }}
                  </div>
                </div>

                <div class="rt-con-module">
                  <span>
                    <img
                      src="@/assets/icon-hg@2x.png"
                      v-if="
                        selectDiscount && selectDiscount.code_name == '贵宾价'
                      "
                      alt=""
                    />
                    ￥{{ selectDiscount.convert_money }}元
                  </span>
                  <i class="iconfont icon-qianjin"></i>
                </div>
              </div>
            </div>
            <!--趣豆 -->
            <div
              class="discounted-price qd-ui"
              v-if="integralChooseSwitch"
            >
              <mt-checklist
                align="right"
                v-model="checkboxintegral"
                :options="['1']"
                v-if="checklistSwitch"
              >
              </mt-checklist>
              <div class="rt-con">
                <div class="rt-con-module">趣豆</div>
                <div class="rt-con-module">
                  可使用{{ deduction_integral_num }}趣豆，抵扣<span>￥{{ countIntegralDeductionMoney() }}</span>
                </div>
              </div>
            </div>
            <!-- 趣豆免单 -->
            <div
              class="discounted-price qd-ui"
              v-if="integralFreeOfChargeSwitch"
            >
              <div class="rt-con">
                <div class="rt-con-module">免单</div>
                <div class="rt-con-module">使用{{ product_integral }}趣豆</div>
              </div>
            </div>
            <div class="discounted-price">
              <span v-if="integralFreeOfChargeSwitch">
                实付
              </span>
              <div class="total-pay">
                <b v-if="integralFreeOfChargeSwitch">
                  <img
                    src="@/assets/dov@2x.png"
                    class="doc"
                  />{{
                  product_integral
                  }}趣豆
                </b>
                <b v-else> 实付￥{{ total() }}元</b>
              </div>
            </div>
            <div
              class="operates"
              v-if="mainboardType == 1"
            >
              <i
                class="iconfont icon--"
                @click="subduction"
                :class="[minusClass?'gray':'']"
              ></i>
              <span>{{ doorArr.length }}</span>
              <i
                class="iconfont icon-icon-test"
                :class="[addClass?'gray':'']"
                @click="additions"
              ></i>
            </div>
          </div>
          <div
            class="door"
            v-if="mainboardType == 0"
          >
            <img
              src="@/assets/img-zgd@2x.png"
              alt=""
            />
            {{
            this.doorIndex > 0 ? this.doorIndex + "号柜门待开箱" : "暂无柜门"
            }}
          </div>
          <div class="btn-submit">
            <mt-button
              v-if="!isDisableClick"
              type="primary"
              :disabled="isDisableBuy"
              @click.native="sumbit"
              :class="'theme_' + $store.state.styleColor"
              size="large"
            >{{ isDisableBuy ? "每日仅限购一桶" : "确认" }}
            </mt-button>
            <mt-button
              v-if="isDisableClick"
              type="default"
              :disabled="isDisableClick"
              size="large"
            >正在提交…
            </mt-button>
          </div>
        </div>
      </div>
    </transition>
    <mt-popup
      v-model="popupVisibleTwo"
      v-if="popupVisibleTwo"
      position="bottom"
    >
      <div class="picker-wrap">
        <mt-picker
          :showToolbar="true"
          :visibleItemCount="3"
          :slots="slots"
          value-key="code_name"
          @change="onValuesChange"
        >
          <div class="findTitle">
            <span @click="popupVisibleTwo = false">取消</span>
            <!-- <span>确定</span> -->
          </div>
        </mt-picker>
      </div>
    </mt-popup>
    <transition name="fade">
      <div
        class="order-time animated slideInDown"
        v-if="$store.state.orderTime > 0"
      >
        有未完成订单，请手动取消或者等待
        {{ $store.state.orderTime }}s再次购买
      </div>
    </transition>
    <transition name="fade">
      <div
        class="order-time animated slideInDown"
        v-if="step > 0 && timer"
      >
        支付时间剩余
        <span style="color:red">{{ step }}</span>
        s
      </div>
    </transition>
  </div>
</template>

<script>
import {
  findDiscountUserMoney,
  findUserCode,
  wxPay,
  zfbzf,
  findOrderPurchaseLimitation,
  findVipProduct,
  getDoorIndex,
  removeDoorLock
} from '@/api'
import { init, savePay } from '@/common/js/globalJs.js'
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  props: {
    pop: '',
    buyItem: '',
    isDisableBuy: {
      type: Boolean,
      default: false
    },
    isActivity: {
      type: Boolean,
      default: false
    },
    styleCode: null,
    surplus_integral: 0, // 自己的积分剩余
    to_use_sum: 0 // 1积分能抵扣的商品
  },
  data() {
    return {
      disable: false,
      addClass: false, //点击加只变加的颜色
      minusClass: false, //点击减只变加的颜色
      checkboxdiscounts: ['1'],
      checkboxintegral: [],
      popupVisible: false,
      popupVisibleTwo: false,
      popupVisibleTime: true,
      isDisableClick: false,//防重复提交
      doorIndex: 0,
      step: 0,
      timer: '',
      qdCheck: false,
      slots: [
        {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot1'
        }
      ],
      selectDiscount: '',
      selectChangeItem: '',
      product_integral: 0, // 商品所需积分
      deduction_integral_num: 0, // 现在商品所能抵扣的积分数量
      integralChooseSwitch: false, // 是否显示趣豆框
      checklistSwitch: false, // 是否显示按钮
      integralFreeOfChargeSwitch: false, // 积分免单开关
      doorArr: [],
      mainboardType: 0
    }
  },

  watch: {
    $route(n, x) {
      if (x.name == 'home') {
        this.popupVisible = false
        this.popupVisibleTwo = false
      }
    },

    pop() {
      this.isDisableBuy = false
      this.isDisableClick = false
      this.init()
    },
    checkboxintegral: {
      handler: function(newVal, oldVal) {
        if (newVal.length > 0 && oldVal.length == 0) {
          this.checkboxdiscounts = []
        } else if (oldVal.length > 0 && newVal.length == 0) {
          // 用户取消了积分使用的按钮
          // 有优惠券的情况下
          if (this.selectDiscount) {
            this.checkboxdiscounts = ['1']
          } else {
            // 没有优惠券的情况下
            // 就让他取消吧
          }
        }
      },
      deep: true //关键字，只有声明deep: true才能监听到整个对象的变化
    },
    checkboxdiscounts: {
      handler: function(newVal, oldVal) {
        if (newVal.length > 0 && oldVal.length == 0) {
          this.checkboxintegral = []
        } else if (oldVal.length > 0 && newVal.length == 0) {
          // 用户取消了优惠券使用的按钮
          // 优惠券是必须使用的，所以两者出现的话，必定需要用一种优惠方式
          this.checkboxintegral = ['1']
        }
      },
      deep: true //关键字，只有声明deep: true才能监听到整个对象的变化
    }
  },
  methods: {
    init() {
      //  限购-> vip特价 ->优惠券 -> 随机立减
      // 是否有随机立减  如果有 先访问findDiscountUserMoney 再访问findUserCode 如果没有  直接访问findUserCode
      this.selectDiscount = ''
      this.slots[0].values = []
      this.doorArr = []

      let { mainboardType } = this.$parent.resData
      this.mainboardType = mainboardType
      let data = this.buyItem

      let userInfo = this.getUserInfo()

      // 商品所需积分
      this.product_integral = this.buyItem.integralQuantityForNoPay
      this.getDoor()

      // 优惠活动方式选择项
      this.discountsShowWay(data, userInfo)
    },
    /**添加数量 */
    additions() {
      this.getDoor()
    },
    /**减少数量 */
    subduction() {
      if (this.disable) {
        return
      }

      if (this.doorArr.length > 1) {
        this.disable = true
        this.minusClass = true
        removeDoorLock({
          doorIndex: this.doorArr[0]
        }).then(res => {
          this.doorArr = this.doorArr.slice(1)
          this.disable = false
          this.minusClass = false
        })
      }
    },
    /**获取柜门 */
    getDoor() {
      let that = this
      if (this.disable) {
        return
      }
      this.disable = true
      this.addClass = true
      let { isGift, productId } = this.buyItem
      getDoorIndex({
        productId,
        isGift
      }).then(res => {
        this.disable = false
        this.addClass = false
        if (res.doorIndex == 0) {
          Toast({
            message: '已达购买上线',
            position: 'middle',
            duration: 5000
          })
          return
        }
        this.doorIndex = res.doorIndex

        let { mainboardType } = that

        //售货架子

        let { sec } = res
        if (res.doorIndex > 0 && that.doorArr.length <= 0) {
          that.step = sec
          // that.step = 1000000
          that.timer = setInterval(() => {
            if (that.step <= 0) {
              clearInterval(that.timer)
              that.closeVisible()
            }

            that.step -= 1
          }, 1000)
        }
        if (mainboardType == 1) {
          that.doorArr.push(res.doorIndex)
        }
      })
    },
    /**用户购买是否有限购 */
    _getLimit() {
      findOrderPurchaseLimitation().then(res => {
        this.isDisableBuy = res.tag == 1 ? false : true
        this.endShouchang()
      })
    },
    /**获取VIP优惠 */
    _getvVipCoupon(userInfo, data) {
      findVipProduct({
        clientId: userInfo.clientId,
        productId: data.productId
      }).then(res => {
        //是贵宾  则去贵宾价格 否则走随机立减和优惠劵获取接口、积分使用
        if (res.vipPrice.tag == 1) {
          let subtract = {
            code_name: '贵宾价',
            convert_money: res.vipPrice.vipPrice,
            randomDiscountId: res.vipPrice.gohVipPriceRecordId,
            randomDiscountMoney: res.vipPrice.vipPrice,
            randomActivityId: res.vipPrice.eventId
          }
          this.slots[0].values.push(subtract)
          this.endShouchang()
          // 隐藏积分显示区
          this.integralChooseSwitch = false
          // 隐藏按钮
          this.checklistSwitch = false
          // 去除免单选项
          this.integralFreeOfChargeSwitch = false
          // 取消选择积分按钮
          this.checkboxintegral = []
        } else {
          //满足随机立减
          if (this.isActivity) {
            this._getRandomMoeny()
          }
          this._getCommonCoupon()
          // 是否使用积分
          this.payChooseSwitch()
        }
      })
    },
    /**普通优惠劵 */
    _getCommonCoupon() {
      findUserCode({ isAll: false }).then(res => {
        if (res.code && res.code.length) {
          let code = res.code
          for (var i = 0, len = code.length; i < len; i++) {
            // 筛选 相同pid 的才让他选择
            if (code[i].pid == this.buyItem.productId) {
              this.slots[0].values.push(code[i])
            }
          }
        }
        this.endShouchang()
        // 售货架不使用积分 -> 2020-05-26 售货架开启使用
        // if (this.mainboardType != 1) {
          // 是否使用积分
          this.payChooseSwitch()
        // }
        // 积分免单的情况，不使用优惠券
        if (this.integralFreeOfChargeSwitch) {
          this.selectDiscount = ''
        }
      })
    },
    /**获取随机立减 */
    _getRandomMoeny() {
      findDiscountUserMoney({productId:this.buyItem.productId}).then(res => {
        if (res.discountMoney) {
          let d = res.discountMoney
          let money = res.discountMoney.randomDiscountMoney
          if (money > 0) {
            var subtract = {
              code_name: '随机立减',
              convert_money: money,
              randomDiscountId: d.randomDiscountId,
              randomDiscountMoney: money,
              randomActivityId: d.randomActivityId
            }
            this.slots[0].values.push(subtract)
          }
          this.endShouchang()
        }
      })
    },
    /**
     * 支付（微信和支付宝）
     * @param  {[int]}      boxNum                  柜门序号(1-28)
     * @param  {[int]}      productId               商品ID
     * @param  {[double]}   price                   商品价格金额
     * @param  {[int]}      mcId                    货柜ID
     * @param  {[double]}   finalMoney              实际金额
     * @param  {[int]}      codeTypeId              代金券方案ID
     * @param  {[string]}   codeNo                  优惠券金额
     * @param  {[int]}      randomDiscountId        随机立减ID
     * @param  {[int]}      randomActivityId        随机立减活动ID
     * @param  {[double]}   randomDiscountMoney     随机立减金额
     * @param  {[int]}      gohVipPriceRecordId     贵宾商品Id
     * @param  {[int]}      clientId                用户clientId
     *
     */
    sumbit() {
      if (this.isDisableClick) {
        return
      }
      //防止点击重复
      this.isDisableClick = true
      let item = this.buyItem
      let disc = this.selectDiscount
      let userInfo = this.getUserInfo()
      let { doorArr } = this
      localStorage.setItem(
        'payDoor',
        doorArr.length > 0 ? '-1' : this.doorIndex
      )
      let params = null

      //没有优惠劵
      if (!disc) {
        params = {
          boxNum: this.doorIndex,
          productId: item.productId,
          price: item.price,
          finalMoney: this.total(),
          randomDiscountMoney: 0
        }
      } //贵宾价
      else if (
        userInfo &&
        userInfo.clientId > 0 &&
        disc.code_name == '贵宾价'
      ) {
        params = {
          boxNum: this.doorIndex,
          productId: item.productId,
          // 贵宾的订单金额需要传贵宾价
          price: disc.convert_money,
          // 实际支付金额不能为零就好，后端不用它判断。
          finalMoney: disc.convert_money,
          randomDiscountMoney: 0,
          gohVipPriceRecordId: disc.randomDiscountId,
          clientId: userInfo.clientId
        }
      } //有优惠劵
      else {
        params = {
          boxNum: this.doorIndex,
          productId: item.productId,
          price: item.price,
          finalMoney: this.total(),
          codeTypeId: disc ? disc.TYPE_ID : null,
          codeNo: disc ? disc.code_no : null,
          randomDiscountId: disc ? disc.randomDiscountId : 0,
          randomActivityId: disc ? disc.randomActivityId : 0,
          randomDiscountMoney: disc
            ? disc.randomDiscountMoney
              ? disc.randomDiscountMoney
              : 0
            : 0
        }

      }

      if (userInfo && userInfo.clientId) {
        params.clientId = userInfo.clientId
      }

      // 清理
      function clearParams(params) {
        params.randomDiscountMoney = 0
        params.codeNo = null
        params.codeTypeId = null
        params.randomDiscountId = 0
        params.randomActivityId = null
        return params
      }

      //如果是售货架子

      if (doorArr.length) {
        delete params.boxNum
        params.doorIndexs = JSON.stringify(doorArr)

        // this.checkboxintegral = []  // 这一步注释掉 售货架就可以使用积分了
        // params.finalMoney = params.price
      }

      console.log("integralFreeOfChargeSwitch",this.integralFreeOfChargeSwitch);

      // 0不使用积分，1积分免单,2积分抵扣
      if (this.integralFreeOfChargeSwitch) {
        params.integralPayType = 1
        params.finalMoney = 0
        // 清理
        params = clearParams(params)
      } else if (this.checkboxintegral.length > 0) {
        params.integralPayType = 2
        // 清理
        params = clearParams(params)
      } else {
        params.integralPayType = 0
      }
      console.log("params",params)

      localStorage.setItem('lastBuy', params.productId)
      this.loading.open('加载中...')
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        wxPay(params).then(res => {
          this.loading.close()
          this.isDisableClick = false
          localStorage.setItem('payOrderId', res.orderId)
          localStorage.setItem('payOrderNo', res.orderNo)
          if (res.code != 'E00000') {
            let step = res.message.slice(res.message.lastIndexOf('|') + 1)
            if (step > 0) {
              this.startTimeCount(step)
              return
            }
            Toast({
              message: res.message,
              position: 'middle',
              duration: 5000
            })
          } else {
            clearInterval(this.timer)
            this.timer = ''
            if (params.finalMoney === 0) {
              this.closeVisible()
              this.$router.push({ path: '/paySuccess' })
              return
            }

            savePay(
              res.appId,
              res.timeStamp,
              res.nonceStr,
              res.package,
              res.paySign,
              item.doorIndex
            )
              .then(
                res => {
                  if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    this.$router.push({ path: '/paySuccess' })
                  }
                },
                () => {
                  this.closeVisible()
                }
              )
              .finally(() => {
                this.popupVisible = false //关闭弹窗
                this.popupVisibleTwo = false //关闭弹窗
              })
          }
        })
      } else if (/AlipayClient/.test(window.navigator.userAgent)) {
        zfbzf(params).then(res => {
          this.loading.close()
          this.isDisableClick = false
          if (res.code == 'E00001') {
            let step = res.message.slice(res.message.lastIndexOf('|') + 1)
            if (step > 0) {
              this.startTimeCount(step)
              return
            }
            Toast({
              message: res.message,
              position: 'middle',
              duration: 5000
            })
          } else {
            clearInterval(this.timer) //清除定时器
            this.timer = ''
            localStorage.setItem('payOrderId', res.orderId) //存储本地，订单ID
            localStorage.setItem('payOrderNo', res.orderNo) //存储本地，订单号

            if (params.finalMoney === 0) {
              this.closeVisible()
              this.$router.push({ path: '/paySuccess' })
              return
            }
            let div = document.createElement('div')
            div.innerHTML = res.pay
            document.body.appendChild(div)
            this.$nextTick(() => {
              document.forms[0].submit()
            })
          }
          this.popupVisible = false
          this.popupVisibleTwo = false
        })
        // index#/paySuccess
      }
    },
    /**请求接口解除柜门锁定 */
    removeDoor() {
      let arr = Object.assign(this.doorArr, {})
      if (this.doorArr.length) {
        for (let key of arr) {
          removeDoorLock({
            doorIndex: key
          }).then(res => {})
        }
        this.doorArr = []
      } else {
        removeDoorLock({
          doorIndex: this.doorIndex
        })
      }
    },
    /**关闭弹出，清除定时，清除锁 */
    closeVisible() {
      this.popupVisible = false

      clearInterval(this.timer)
      this.timer = ''

      this.removeDoor()
    },
    /**数据都请求完后才显示弹出 ，并设置优惠劵默认值 */
    endShouchang() {
      this.popupVisible = true;
      this.selectDiscount = this.slots[0].values[0];
    },
    /**优惠劵发生改变 */
    onValuesChange(picker, values) {
      this.selectChangeItem = values[0]
      this.selectDiscount = values[0]
    },
    /*计算总价*/
    total() {
      let selectDiscount = this.selectDiscount
      let buyItem = this.buyItem
      if (selectDiscount && selectDiscount.code_name == '贵宾价') {
        return selectDiscount.convert_money
      } else if (buyItem) {
        let price = buyItem.price
        //如果是售货架
        let { mainboardType } = this
        // 商品数量
        let productNum = 1

        if (mainboardType == 1) {
          productNum = this.doorArr.length
          price = price * productNum
        }
        // 单个商品的价格
        let singlePrice = Number((price/productNum).toFixed(2))
        if (this.integralChooseSwitch) {
          // 有积分的选择项
          if (this.checkboxintegral.length > 0) {
            // 不用优惠券
            selectDiscount = ''
            // 积分抵扣金额
            var integralDeductionMoney = this.countIntegralDeductionMoney()
            price = Number((price - integralDeductionMoney).toFixed(2))
          }
        }

        // 优惠只能一个商品享受
        if(productNum>1){
          // 剩余商品的金额
          let residuePrice = Number((price - singlePrice).toFixed(2));
          //减去单个商品优惠的金额
          singlePrice =
            selectDiscount && selectDiscount.convert_money
              ? (singlePrice - selectDiscount.convert_money).toFixed(2)
              : singlePrice.toFixed(2)
          singlePrice = singlePrice > 0 ? singlePrice : 0
          // 将剩余商品金额加回来
          price = (Number(singlePrice) + residuePrice).toFixed(2)
        }else{
          //减去优惠的金额
          price =
            selectDiscount && selectDiscount.convert_money
              ? (price - selectDiscount.convert_money).toFixed(2)
              : price.toFixed(2)
        }

        return price > 0 ? price : 0
      }
    },
    ...mapGetters({
      getUserInfo: 'getUserInfo'
    }),
    ...mapActions({
      startTimeCount: 'setOrderTime'
    }),
    // 优惠框显示方式：优惠、积分选择方式是否显示
    discountsShowWay(data, userInfo) {
      this.loading.close()
      // 2020-04-17 售货架只有一种优惠活动，随机立减 -> 增加优惠券活动使用2020-05-22 xhx -> 增加积分使用在this._getCommonCoupon()里判断积分的使用2020-05-26
      if (this.mainboardType == 1) {
           this._getRandomMoeny()
           //满足优惠劵条件
          this._getCommonCoupon()
      // else 走售货柜流程
      } else {
        if (data.isLimit) {
          //满足限购条件
          this._getLimit()
        } else if (userInfo.clientId) {
          //满足VIP贵宾条件
          this._getvVipCoupon(userInfo, data)
        } else {
          //满足随机立减
          if (this.isActivity) {
            this._getRandomMoeny()
          }
          //满足优惠劵条件
          this._getCommonCoupon()
        }

        // 免单优惠 用户的积分多于商品需要抵扣的积分
        if (
          this.product_integral != 0 &&
          this.product_integral <= this.surplus_integral
        ) {
          this.integralFreeOfChargeSwitch = true
        } else {
          this.integralFreeOfChargeSwitch = false
        }
      }
    },
    // 积分抵扣选择框
    payChooseSwitch() {
      if (this.surplus_integral > 0) {
        this.integralChooseSwitch = true
        this.checklistSwitch = true
      } else {
        this.integralChooseSwitch = false
        this.checklistSwitch = false
      }
      // 没有优惠券并且有积分的时候
      if (!this.selectDiscount && this.integralChooseSwitch) {
        this.checkboxdiscounts = []
        this.checkboxintegral = ['1']
      } else {
        this.checkboxdiscounts = ['1']
        this.checkboxintegral = []
      }

      // 积分免单时 不能使用优惠券和积分抵扣
      if (this.integralFreeOfChargeSwitch) {
        this.checklistSwitch = false
        this.integralChooseSwitch = false
      }
    },
    // 计算积分抵扣金额
    countIntegralDeductionMoney() {
      // 商品金额
      let productPrice = this.buyItem.price

      // 用户积分>0
      if (this.surplus_integral > 0) {
        let deductionMoney = Number(
          (this.surplus_integral * this.to_use_sum).toFixed(2)
        )
        // 当商品价格小于用户能抵扣的总金额  抵扣金额就变为商品的价格  李德广的计算积分：就算加一个积分，也要把金额全抵掉，不要让用户付钱
        if (productPrice < deductionMoney) {
          let integralNum = Number((productPrice / this.to_use_sum).toFixed(2))
          if (integralNum % 1 !== 0) {
            integralNum = parseInt(integralNum)
            integralNum++
          } else {
            integralNum = parseInt(integralNum)
          }
          // 显示需要使用多少积分
          this.deduction_integral_num = integralNum

          // 积分能抵扣的金额已经超过商品金额
          return productPrice
        } else {
          // 显示需要使用全部积分
          this.deduction_integral_num = this.surplus_integral
        }
        return deductionMoney
      }
      return 0
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.mint-popup {
  background: transparent;
}
.pop-item {
  .my-pop {
    @include fjc;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 30;
    height: calc(100% - 100px);
    height: calc(100% - 100px - env(safe-area-inset-bottom));
    .black-wrap {
      @include black-wrap-fixed;
      height: calc(100% - 100px);
      height: calc(100% - 100px - env(safe-area-inset-bottom));
    }
    .content-wrap {
      z-index: 10;
      border-radius: 16px;
      background: #fff;
      padding: 30px;
      padding-top: 0;
      width: 636px;
      box-sizing: border-box;
      .content {
        .title {
          position: relative;
          height: 88px;
          @include fjc;
          @include color111;
          font-size: 32px; /*px*/
          i {
            padding: 30px;
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translate(0, -50%);
          }
        }
        > div {
          border-bottom: 2px dashed $color-border;
        }
        .goods-info2{
          > div{
            margin-top: 20px;
            img{
              width: 100%;
              border-top-left-radius: 0.8em;
              border-top-right-radius: 0.8em;
            }
          }
          .name{
            color: #333333;
            font-size: 30px;
            line-height: 1.2em;
            text-align: left;
            display: flex;
            justify-content: space-between;
            > div:first-child{
              width: 80%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span{
              color: #e24a4a;
            }
          }
          .price{
            display: flex;
            justify-content: flex-end;
            font-size: 30px;
            line-height: 1.2em;
            padding-bottom: 30px;
            > div:first-child {
              span{
                font-weight: bold;
                 font-size: 36px;
              }
            }
            span{
              color: #e24a4a;
            }
          }
        }
        .goods-info {
          display: flex;
          padding: 25px 0;
          position: relative;
          > div:first-child {
            width: 160px;
            padding: 0 30px;
            height: 160px;
            display: flex;
            align-items:center;
            img {
              width: 100%;
            }
          }
          .right-con {
            position: relative;
            flex: 1;
            display: flex;
            align-content: center;
            flex-flow: row wrap;

            > div {
              width: 100%;
              font-size: 28px;
              color: #111;
              text-align: left;
            }
            > div:nth-child(2) {
              font-size: 34px; /*px*/
              color: $color-sub-theme;
              margin-top: 22px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              padding-right: 40px;
              > div:last-child {
                font-size: 26px;
                color: #666;
                span {
                  color: $color-sub-theme;
                }
              }
            }
          }
        }

        .discounted-price {
          height: 88px;
          font-size: 28px; /*px*/
          @include fjc(center, space-between);
          @include color999;
          .rt-con-module {
            @include fac;
          }
          > div {
            display: flex;
            align-items: center;
            img {
              width: 40px;
            }
            .biaoshi {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              font-size: 20px; /*px*/
              padding: 4px 8px;
              border: 2px solid #e24a4a;
              border-radius: 8px;
              color: #e24a4a;
              margin-left: 15px;
            }
            &.total-pay{
              font-size: 32px;
              font-weight: bold;
              justify-content: flex-end;
              text-align: right;
              width: 100%;
              b{
                color: #e24a4a;
              }
            }
            b {
              @include color111;
              @include fac;
              img {
                width: 34px;
                height: 30px;
                margin-right: 8px;
              }

            }
            span {
              color: $color-sub-theme;
            }
          }
        }
      }
      .btn-submit {
        padding-top: 20px;
      }
    }
  }
}
.mint-popup-bottom {
  width: 100%;

  > .picker-wrap {
    background: #fff;
    padding-bottom: 100px; /*px*/
    padding-bottom: calc(env(safe-area-inset-bottom) + 100px); /*px*/
    .findTitle {
      height: 88px;
      @include fjc(center, space-between);
      font-size: 28px; /*px*/
      padding: 0 30px;
    }
  }
}
.order-time {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 40;
  background: rgba(0, 0, 0, 0.8);
  @include fjc;
  color: #fff;
  font-size: 26px; /*px*/
}
.door {
  font-size: 35px; /*px*/
  margin-top: 40px;
  @include color666;
  @include fjc;
  img {
    width: 120px;
    height: 116px;
  }
}

.qd-ui {
  height: 88px;
  font-size: 28px; /*px*/
  @include fjc(center, space-between);
  .rt-con {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    font-size: 26px; /*px*/
    @include color999;
    span {
      color: #fd0900;
    }
  }
}

.myfade-enter-active,
.myfade-leave-active {
  transition: opacity 0.3s;
}
.myfade-enter, .myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mint-checklist-title,
.mint-checkbox-label {
  margin: 0;
}
.mint-checklist {
  margin-right: 30px;
}
.mint-cell {
  min-height: 76px;
  border: none;
  .mint-checkbox-label {
    display: none;
  }
}
.mint-cell-title {
  text-align: left;
}
.mint-checklist-label,
.mint-cell-wrapper {
  border: none;
  border-color: #fff;
  padding: 0;
  background-image: none;
}
.mint-cell:last-child{
  border: none;
  border-color: #fff;
  background-image: none;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #ffc400 !important;
  border-color: #ffc400 !important;
}

.mint-checkbox-label {
  color: #999;
}
.operates {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 60px;
    color: #ffc400;
    padding: 18px 5px;
    &.gray {
      color: #999;
    }
  }
  span {
    display: inline-flex;
    width: 60px;
    font-size: 32px;
    justify-content: center;
  }
}
</style>