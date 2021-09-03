<template>
  <div class="confirm-wrap">
    <!-- 地址 -->
    <ul class="address">
      <li @click="chooseAddress">
        <div v-if="contacts" class="contacts">
          <span>{{ contacts }}</span>
          <span>{{ phone }}</span>
        </div>
        <div v-if="address" class="detail">{{ address }}</div>
        <div @click="chooseAddress" v-if="!address" class="no-address">未添加地址或未设置默认地址，点击去选择</div>
        <div class="dotted-line">
          <div class="wrap-zebra">
            <ul class="zebra" v-for="item in 5" :key="item">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="point-out"><i class="iconfont icon-qianjin"></i></div>
      </li>
    </ul>
    <!-- 商品 -->
    <div class="goods-wrap">
      <div class="title">商品详情</div>
      <div class="goods">
        <div class="img-wrap"><img :src="picture" alt="" /></div>
        <div class="intro-box">
          <div class="name">{{ name }}</div>
          <div class="price">¥{{ price }}</div>
          <div class="operates">
            <i @click="_increaseOrDecrease(number, '-')" class="iconfont icon--"></i>
            <input type="number" @change="sum" v-model="number" />
            <i @click="_increaseOrDecrease(number, '+')" class="iconfont icon-icon-test"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付相关 -->
    <div class="pay-wrap">
      <mt-field label="支付方式" value="在线支付" readonly></mt-field>
      <mt-field label="留言" v-model="remark"></mt-field>
    </div>
    <!-- 操作按钮 -->
    <div class="bot-btn">
      <div class="left">
        实付：
        <span>￥{{ total }}</span>
      </div>
      <div class="right"><el-button :class="['theme_' + $store.state.styleColor]" @click="submit" class="buy-now">立即支付</el-button></div>
    </div>
  </div>
</template>

<script>
import { findVendorClientAddrss, findSingleProducts, singleProductPay, wxPay, zfbzf } from '@/api';
import { MessageBox, Toast } from 'mint-ui';
import { init, savePay } from '@/common/js/globalJs.js';
export default {
  data() {
    return {
      contacts: '',
      phone: '',
      address: '',
      sendAddress: '',
      did: null,
      name: '',
      number: 1,
      remark: '',
      picture: '',
      price: 0,
      pid: null,
      chooseback: 0,
      total: 0,
      isDisableClick: false
    };
  },
  mounted() {
    this.chooseback = this.$route.query.chooseback;
    this.pid = this.$route.query.pid;
    this.contacts = this.$route.query.contacts;
    this.phone = this.$route.query.phone;
    this.address = this.$route.query.address;
    this.sendAddress = this.$route.query.sendAddress;
    this.did = this.$route.query.did;
    if (!this.chooseback) {
      this.getAddressData();
    }
    if (this.pid) {
      this.findSingleProducts(this.pid);
    }
  },
  created() {},
  methods: {
    sum() {
      this.total = (this.price * this.number).toFixed(2);
    },
    /**
     * 加减操作
     * @private
     * target 点击元素内容
     * fIndex  店铺 下标
     * pIndex  商品下标
     * character  + -
     */
    _increaseOrDecrease(target, character) {
      let number = this.number;

      if (character == '+') {
        number += 1;
      } else if (character == '-') {
        number -= 1;
      }

      if (number < 1) {
        number = 1;
        Toast({
          message: '最少购买1件',
          position: 'middle',
          duration: 1000
        });
      }
      this.number = number;
      this.sum();
    },
    /* 提交订单 */
    submit() {
      if(!this.sendAddress){
        Toast({
          message: '请选择配送地址再提交。',
          position: 'middle',
          duration: 1000
        });
        return false;
      }
      if (this.isDisableClick) {
        return;
      }
      //防止点击重复
      this.isDisableClick = true;
      let params = {
        productId: this.pid,
        productQty: this.number,
        orderMoney: this.number * Number(this.price),
        did: this.did,
        sendAddress: this.sendAddress,
        phone: this.phone,
        contacts: this.contacts,
        remark: this.remark
      };
      console.log(window.navigator.userAgent);
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        singleProductPay(params).then(res => {
          this.loading.close();
          this.isDisableClick = false;
          localStorage.setItem('payOrderId', res.orderId);
          localStorage.setItem('payOrderNo', res.orderNo);
          localStorage.setItem('payOrderType', 2);
          if (res.code != 'E00000') {
            Toast({
              message: res.message,
              position: 'middle',
              duration: 5000
            });
          } else {
            savePay(res.appId, res.timeStamp, res.nonceStr, res.package, res.paySign)
              .then(
                resp => {
                  if (resp.err_msg == 'get_brand_wcpay_request:ok') {
                    this.$router.push({ path: '/paySuccessOnline' });
                  }
                },
                (err) => {
                  if (err.err_msg == "get_brand_wcpay_request:cancel") {
                    this.$router.push({ path: '/payFailOnline' });
                  }
                }
              )
              .finally(() => {

              });
          }
        });
      } else if (/AlipayClient/.test(window.navigator.userAgent)) {
        console.log(params);
        singleProductPay(params).then(res => {
          console.log(res);
          this.loading.close();
          this.isDisableClick = false;
          if (res.code == 'E00001') {
            Toast({
              message: res.message,
              position: 'middle',
              duration: 5000
            });
          } else {
            localStorage.setItem('payOrderId', res.orderId); //存储本地，订单ID
            localStorage.setItem('payOrderNo', res.orderNo); //存储本地，订单号
            localStorage.setItem('payOrderType', 2);
            let div = document.createElement('div');
            div.innerHTML = res.pay;
            document.body.appendChild(div);
            this.$nextTick(() => {
              document.forms[0].submit();
            });
          }
        });
      }
    },
    /* 获取商品详情*/
    findSingleProducts(pid) {
      findSingleProducts({
        productId: pid
      }).then(res => {
        this.name = res.singleProducts[0].productName;
        this.price = res.singleProducts[0].price;
        this.picture = res.singleProducts[0].productPic;
        this.sum();
      });
    },
    /* 选择地址 */
    chooseAddress() {
      this.$router.push({
        path: '/address',
        query: {
          confirm: 1,
          pid: this.pid
        }
      });
    },
    getAddressData() {
      this.loading.open('加载中...');
      findVendorClientAddrss().then(res => {
        console.log(res);
        if (res.length) {
          for (let aitem of res) {
            if (aitem.ifDefault) {
              this.contacts = aitem.contacts;
              this.phone = aitem.phone;
              this.did = aitem.did;
              this.address = aitem.communityName + aitem.sendAddress;
              this.sendAddress = aitem.sendAddress;
            }
          }
        }

        this.loading.close();
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/common/scss/mixin.scss';
.confirm-wrap {
  .bot-btn {
    position: fixed;
    font-size: 32px;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    height: 120px;
    .left {
      padding: 20px;
      line-height: 80px;
      span {
        color: #fd0900;
      }
    }
    .right {
      width: 200px;
      height: 60px;
      .buy-now {
        width: 200px;
        height: 120px;
        font-size: 32px;
        line-height: 60px;
        color: #000;
      }
    }
  }
  .pay-wrap {
    margin-top: 15px;
    background-color: #fff;
    padding: 0 20px;
    .mint-field-core {
      text-align: right;
    }
    .mint-field .mint-cell-title {
      text-align: left;
    }
  }
  .goods-wrap {
    margin-top: 15px;
    background-color: #fff;
    .title {
      border-bottom: 1px solid #d8d8d8;
      padding: 20px;
      line-height: 2em;
      font-size: 30px;
      text-align: left;
    }
    .goods {
      display: flex;
      padding: 20px;
      justify-content: flex-start;
      position: relative;
      .img-wrap {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .intro-box {
        font-size: 30px;
        padding: 10px 20px;
        text-align: left;
        line-height: 3em;
        .price {
          color: #fd0900;
        }
      }
      .operates {
        position: absolute;
        bottom: 10px;
        right: 30px;
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
        input {
          display: inline-flex;
          width: 60px;
          font-size: 32px;
          justify-content: center;
          text-align: center;
          border: 1px solid #d0d0d0;
        }
      }
    }
  }
  .address {
    position: relative;
    margin-top: 15px;
    background-color: #fff;
    text-align: left;
    line-height: 2em;
    padding: 20px 0 0;
    font-size: 30px;
    overflow: hidden;
    .detail {
      padding: 0 40px;
    }
    .contacts {
      color: #333333;
      padding: 0 40px 20px;
    }
  }
  .no-address {
    font-size: 30px;
    line-height: 3em;
    padding: 20px 30px 40px;
  }
  .point-out {
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    @include fjc;
  }

  .dotted-line {
    .zebra,
    .wrap-zebra {
      display: flex;
    }

    .wrap-zebra {
      position: relative;
      left: -12px;
    }

    .zebra > li {
      width: 45px;
      height: 6px;
      transform: skew(-45deg);
      margin-right: 30px;
    }

    .zebra > li:nth-child(1) {
      background: #ffc4cf;
    }

    .zebra > li:nth-child(2) {
      background: #ffc552;
    }

    .zebra > li:nth-child(3) {
      background: #3395ff;
    }
  }
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #fec400;
  background-color: #fec400;
}
</style>
