<template>
  <transition name="slide">
    <div id='my-purse'>
      <div class='header'
           v-if='moenyData'
           :class="'theme-img_'+$store.state.styleColor">
        <div>当前累计红包</div>
        <div>￥{{moenyData.discounts.userMoney}}</div>
        <div>
          红包达到1元公众号自动发放
        </div>
        <div @click='$router.push({path:"/purseRecord"})'>红包记录 <div><i class='iconfont  icon-qianjin'></i></div>
        </div>
      </div>
      <div class='container-html'
           v-if='data.ytRemark'
           v-html='data.ytRemark'>

      </div>
    </div>
  </transition>
</template>
<script>
import { findNotice, findUserInfo } from '@/api'
export default {
  data () {
    return {
      data: '',
      moenyData: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      findUserInfo().then(res => {
        this.moenyData = res
      })
      findNotice({ noticeType: 5 }).then(res => {
        this.data = res
      })
    }
  },
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
#my-purse {
  .header {
    height: 318px;
    display: flex;
    justify-items: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    padding: 0 38px 0 55px;
    position: relative;
    color: #fff;
    > div:first-child {
      padding-top: 52px;
      font-size: 30px;
    }
    > div:nth-child(2) {
      font-size: 72px;
      padding-top: 38px;
      font-weight: 600;
    }
    > div:nth-child(3) {
      height: 63px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(33, 33, 33, 0.3);
      padding-right: 30px;
      box-sizing: border-box;
      @include fjc(center, flex-end);
    }
    > div:nth-child(4) {
      position: absolute;
      top: 27px;
      right: 38px;
      width: 161px;
      height: 46px;
      background: #fefefe;
      color: #d19c0c;
      border-radius: 22px;

      @include fjc;
      > div {
        background: #d19c0c;
        border-radius: 100%;
        width: 28px;
        height: 28px;
        margin-left: 5px;
        @include fjc;
        i {
          position: relative;
          right: -1px;
          top: 1px;
          color: #fff;
          font-size: 18px; /*px*/
        }
      }
    }
  }
  .container-html {
    background: #fff;
    padding: 0 30px;
    line-height: 44px;
    text-align: left;
    letter-spacing: 3px;
    font-size: 26px; /*px*/
  }
}
</style>
