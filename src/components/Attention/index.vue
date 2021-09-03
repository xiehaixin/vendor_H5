<template>
  <transition name="fade"

              v-if='visible'>
    <div class="attention"  :value="value">
      <div class='myCont'>
        <div class='code-er'>
          <img :src="data.registerQrcodeUrl"
               alt="二维码">
        </div>
        <div>
          长按图片【识别二维码】关注公众号
        </div>
        <!-- <div class='el'>
          你还可以
        </div> -->
        <ul>
<!--
          <li>1.打开微信，点击“添加朋友”</li>
          <li>2.点击“公众号”</li>
          <li>3.搜索公众号“EvianLovelyWater”</li> -->
          <!-- <li>1.点击“关注”，完成</li> -->
          <li>如果使用支付宝，请保存二维码后操作关注。</li>
        </ul>
        <div class='close-x'>
          <img :src="require('@/assets/datiTuOff.png')"
               @click='close'
               alt="关闭">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {findVendorConfig} from  '@/api'
export default {
  components: {},
  data () {
    return {
      visible: false
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value (val) {
      this.visible = val;
    },
    visible (val) {
      this.$emit('input', val);
    }
  },
  mounted(){

    this.init()
  },
  methods: {
    init(){
console.log('at:',this.data);

    },
    close () {
      this.visible = false;
    }

  },

}
</script>

<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.attention {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  @include fjc;
  .myCont {
    @include fjc;
    flex-flow: row wrap;
    width: 600px;
    > div {
      width: 100%;
      color: #fff;
    }
    .code-er {
      width: 320px;
      height: 320px;
      img {
        width: 100%;
      }
    }
    > div:nth-child(2) {
      font-size: 32px; /*px*/
      padding: 28px 0;

      border-bottom: 1px solid #fff;
    }
    > .el {
      font-size: 32px; /*px*/
      padding-top: 32px;
      color: #fff;
    }
    ul {
      padding: 0 30px 0 34px;

      li {
        color: #fff;
        padding-top: 16px;
        text-align: left;
      }
    }
    .close-x img {
      padding: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
