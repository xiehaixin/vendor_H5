<template>
  <div class="home-item">
    <!-- <div class='placeholder'
         v-if='item.placeholder'>
      <img v-lazy="require('@/assets/img-deft@2x.png')"
           alt="">
      <div class='text'>
        扫一扫赢大礼
      </div>
    </div> -->
    <!-- 正常销售商品 -->
    <div class="snuff">
      <div class="list-box">
        <div class="pro-img">
          <img v-lazy="item.picture" alt="产品图" />
          <div class="price">
            <div>￥{{ item.price }}</div>

            <div class="qd" v-if="resData.mainboardType != 1 && item.integralQuantityForNoPay > 0">
              <img src="@/assets/dov@2x.png" class="doc" />
              {{ item.integralQuantityForNoPay }}
            </div>
          </div>
          <div class="activity">
            <img v-if="resData.isActivity && _screen(item) && !item.isLimit" src="@/assets/SUIJILJ.png" alt="随机立减" />
            <img
              v-if="item.isCash"
              src="@/assets/sphb@2x.png"
              class="
                   hongbao"
              alt="红包大礼"
            />
          </div>
        </div>

        <div class="bottom-box">
         <div class="left">
           <div class="desc">{{ item.synopsis }}</div>
         </div>
         <div class="right">

           <div class="btn">
             <button v-if="item.number > 0" @click="buyGoods(item, _screen(item))" :class="['theme_' + $store.state.styleColor]">购买 (余{{item.number}})</button>
             <button v-else style="background:#BCBCBB">购买 (余0)</button>
           </div>
         </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: '',
    resData: {}
  },
  methods: {
    _screen(item) {
      return true;
    },
    buyGoods(item, state) {
      if (state) {
        this.$emit('change', item);
      }
    },
    showDetail(item) {
      this.$emit('show', item);
    }
  }
};
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
// 编号
@mixin machinary-code() {
  position: absolute;
  top: 10px;
  left: 0;
  min-height: 45px;
  min-width: 45px;
  padding: 0 10px;
  border-radius: 8px;
  color: #fff;
  font-size: 26px; /*px*/
  @include fjc;
  box-sizing: border-box;
}

.home-item {
  box-sizing: border-box;
  background: #fff;
  // border-radius: 16px;

  width: 100%;

  position: relative;
  z-index: 10;

  display: flex;
  align-self: stretch;

  .snuff {
    width: 100%;
    display: flex;
    align-content: space-between;
  }
  .sell-out {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0 -20px;
    .top {
      span {
        @include machinary-code;
        left: 10px;
      }
    }
    .empty-text {
      background: #f5f5f5;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 75px;
      font-size: 24px; /*px*/
      @include fjc;
      color: #666;
    }
  }
  .yc-style {
    width: 100%;
    .top {
      padding-top: 50px;
      span {
        background: #979797;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
    .middle {
      padding-top: 6px;
    }
  }
  .list-box {
    text-align: left;
    position: relative;
    width: 100%;
    .bottom-box{
      padding: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      line-height: 1.6em;
      .left{
        span{
          color: #fd0900;
        }
      }
      .right{
        text-align: center;
      }
    }

    .pro-img {
      height: 270px;
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .price {
      color: #fff;
      font-size: 44px; /*px*/
      display: flex;
      justify-content: space-between;
      line-height: 2.2em;
      position: absolute;
      top: 120px;
      right: 10px;
      font-weight: bold;
      .qd {
        margin-left: 50px;
        img {
          width: 38px;
        }
      }
    }
    .activity {
      position: absolute;
      top: 200px;
      left: 10px;
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: auto;
        margin-right: 10px;
      }
      .hongbao {
        margin: auto;
        width: 40px;
      }
    }
    .name {
      color: #333333;
      font-size: 32px; /*px*/
    }
    .desc {
      color: #666666;
      font-size: 26px; /*px*/
      padding: 10px 0;
      line-height: 1.6em;
    }

    .btn {
      width: 100%;
      color: #666666;
      @include fjc(center, space-between);
      font-size: 28px; /*px*/
      span {
        color: #fd0900;
      }
      button {
        background: #bcbcbb;
        min-width: 114px;
        height: 58px;
        @include fjc;
        color: #000;
        border-radius: 8px;
      }
    }
  }
}
.placeholder {
  position: relative;
  img {
    width: 100%;
  }
  .text {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 78px;
    font-size: 26px;
    font-weight: 700;
    color: #4a90e2;
    text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0, 0px 4px 0px #909090, 0px 5px 10px rgba(0, 0, 0, 0.4);
  }
}
</style>