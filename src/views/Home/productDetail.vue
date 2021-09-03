<template>

  <div>
    <transition name="slide">
      <div class="produceDetail"
           v-show='popupVisible'
           @click='close'>

        <div class='container'>
          <scroll :data="[product]"
                  :listen-scroll="listenScroll"
                  :probe-type="probeType"
                  :beforeScroll='true'
                  ref="list"
                  class='detail-wrap'>
            <div>

              <div class='header'>
                <div class='product-img'>
                  <img :src="product.picture "
                       alt="">
                </div>
                <div class='product-info'>
                  <div>
                    {{product.productName}}
                  </div>
                  <div>
                    {{product.synopsis}}
                  </div>
                  <div>
                    ￥{{product.price}}
                  </div>
                </div>
              </div>
              <div class='bottom-detail'
                   v-if='product.imageText'>
                <div class='title'>
                  - 商品详情 -
                </div>

                <div v-html="product.imageText">

                </div>

              </div>
            </div>
          </scroll>
          <div class='close-x'
               @click="popupVisible=false"
               v-show='popupVisible'>
            <img src='@/assets/datiTuOff.png'>
          </div>
          <div class='buy-now'
               @click="buyPop(item)"
               v-show='popupVisible'>
            立即<br>购买
          </div>
        </div>

      </div>
    </transition>
    <div class='black-layer'
         v-show='popupVisible'>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import { Popup } from 'mint-ui';
import { findProductById } from '@/api'
import Scroll from '@/components/Scroll/';
export default {
  data () {
    return {
      popupVisible: false,

      product: '',
    }
  },
  props: {
    isShow: '',
    item: ''
  },
  components: {
    Popup,
    Scroll
  },
  watch: {
    isShow () {

      this.loading.open('加载中...');
      findProductById({
        pid: this.item.productId
      }).then(res => {
        res.productDetails.imageText = res.productDetails.imageText.replace(/(<!--.*?-->)|(<(meta|link).*?>)/g, '')

        this.popupVisible = true;
        this.product = res.productDetails;
        this.loading.close();
        this.$nextTick(function () {
          this.$refs.list.$el.style.top = '0px'
        })
      }).catch(function (error) {
        this.loading.close();

      })
    },
    popupVisible (n) {
      if (!n) {
        this.product = ''
      }

    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true

  },
  methods: {
    close (e) {

      if (e.target.className == 'produceDetail') {
        this.popupVisible = false
      }

    },
    buyPop (item) {
      this.popupVisible = false
      this.$emit('change', item)
    },
  },

}
</script>

 <style lang="scss">
.black-layer {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 100px);
  height: calc(100% - 100px - env(safe-area-inset-bottom));
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
 
}
.produceDetail {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 100px);
  height: calc(100% - 100px - env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  align-items: stretch;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 90%;
  background: #fff;
  align-items: stretch;
  margin: 40px 0;
  margin-bottom: calc(env(safe-area-inset-bottom + 40px));
  .detail-wrap {
    position: relative;
    top: 0;
    overflow: hidden;
    > div {
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .header {
      padding: 0 30px;
      .product-img {
        padding: 30px 20px;
        img {
          width: 100%;
        }
      }
      .product-info {
        > div {
          text-align: left;
        }
        > div:first-child {
          font-size: 30px; /*px*/
          color: #111;
          margin-bottom: 8px;
        }
        > div:nth-child(2) {
          font-size: 26px;
          color: #979797;
        }
        > div:last-child {
          padding-top: 30px;
          padding-bottom: 16px;
          font-size: 26px;
          color: #e24a4a;
          font-size: 34px; /*px*/
        }
      }
    }
    .bottom-detail {
      .title {
        height: 88px;
        color: #111;
        font-size: 28px; /*px*/
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .close-x {
    position: absolute;
    top: 0px;
    right: 0;
    width: 48px;
    height: 48px;
    padding: 30px 5%;
    img {
      width: 100%;
    }
  }
  .buy-now {
    position: absolute;
    bottom: 32px;
    right: 30px;
    width: 106px;
    height: 106px;
    z-index: 3000;
    background: rgba(255, 196, 0, 1);
    box-shadow: 0px 6px 12px rgba(121, 121, 121, 0.16);
    border-radius: 50%;
    opacity: 1;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    font-size: 26px; /*px*/
    line-height: 34px;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0.6;
  transform: translate3d(100%, 0, 0);
}
</style>
 