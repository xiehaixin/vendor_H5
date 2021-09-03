<template>
  <div class="for-list">
    <div class='order-id'>
      <div>
        <span> 订单号:</span>
        {{item.orderNo}}
      </div>

      <div class='btn'>

        <span
          class="status-1"
          v-if="item.orderStatus==0&&item.isPay"
        >下单成功</span>
        <mt-button
          type="danger"
          size="small"
          @click.native='cancelOrder(item)'
          v-else-if="item.orderStatus==0&&!item.isPay"
        >
          取消</mt-button>

        <span
          class="status-1"
          v-else-if="item.orderStatus==1"
        >成功提货</span>

        <span
          class='status-2'
          v-else-if="item.orderStatus==-1"
        >
          订单已取消
        </span>
        <span
          class='status-2'
          v-else-if="item.orderStatus==-2&&item.refundStatus==1"
        >
          已退款
        </span>

        <mt-button
          type="primary"
          size="small"
          :class="'theme_'+$store.state.styleColor"
          v-else-if="item.orderStatus==-2"
        >发起退款</mt-button>

      </div>
    </div>
    <div class='item-li'>
      <div>
        <span>驿站 :</span>
        {{item.shopContainerName}}
      </div>
      <div v-if='item.mainboardType==0'>
        <span>柜门 :</span>
        {{item.portNo}}
      </div  >
      <div v-else>
        <span>数量 :</span>
        {{item.number}}
      </div>

      <div>
        <span>商品 :</span>
        {{item.productName}}

      </div>
      <div>
        <span>时间 :</span>
        {{item.createTime}}
      </div>
      <div v-if="item.integralPayType!=0">
        <span>使用趣豆 :</span>
        {{item.integralQuantity}} 颗
      </div>
      <div v-if="item.integralPayType==2">
        <span>抵扣金额 :</span>
        {{item.integralMoney}} 元
      </div>
      <div v-if="item.codeDiscountMoney>0">
        <span>使用优惠券 :</span>
        {{item.codeDiscountMoney}} 元
      </div>
      <div v-if="item.randomDiscountMoney>0">
        <span>随机立减 :</span>
        {{item.randomDiscountMoney}} 元
      </div>
      <div
        class='contact'
        @click='activateRepair(item)'
      >
        联系掌柜
      </div>
    </div>
    <div class='total'>
      <template v-if="item.integralPayType==1">
        <img
          src='@/assets/dov@2x.png'
          class='doc'
        />
        <span>
          免单
        </span>
      </template>
      <template v-else>
        <span>
          支付
        </span>
        <span>
          ￥{{item.sellPrice}}
        </span>
      </template>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  props: {
    item: '',

    principalData: ''
  },
  data() {
    return {
      loading: false
    }
  },
  components: {},
  mounted() {},
  methods: {
    cancelOrder(item) {
      this.$emit('cancel', item)
    },
    activateRepair(item) {
      this.$emit('openRepair', item)
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.for-list {
  margin-bottom: 20px;
  background: #fff;
  .order-id {
    height: 88px;
    @include fjc(center, space-between);
    padding: 0 30px;
    font-size: 26px; /*px*/
    color: #111;
    @include border-bottom;
    > .btn {
      i {
        color: $color-sub-theme;
        font-size: 32px; /*px*/
      }
      .status-1 {
        color: #4a90e2;
      }
      .status-2 {
        color: #f56c6c;
      }
      button {
        height: 58px;
        padding: 0 18px;
      }
    }
  }
  .item-li {
    padding: 24px 30px;
    position: relative;
    font-size: 28px; /*px*/
    text-align: left;

    > div {
      line-height: 54px;
      color: $color-dialog-background;
      span {
        display: inline-block;
        font-weight: bold;
        text-align: right;
        color: #101010;
      }
    }
    .contact {
      position: absolute;
      @include fjc;
      font-size: 28px; /*px*/
      color: #333;
      top: 24px;
      right: 30px;
      min-width: 128px;
      height: 48px;
      border: 2px solid #333;
      border-radius: 2px;
    }
  }
  .total {
    height: 88px;
    @include fjc(center, space-between);
    @include border-top;
    font-size: 28px; /*px*/
    margin: 0 30px;
    img {
      width: 38px;
      height: 32px;
    }
  }
}
</style>
