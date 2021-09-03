<template>
  <transition name="slide">
    <div id='myBean'
         v-if='userData'>
      <div class='header'
           :class="'theme-img_'+$store.state.styleColor"
           v-if='vipRule '>
        <div>
          <div class='nickIgm'>
            <img :src="userInfo.photo"
                 alt="">
          </div>
          <div class='nickName'>
            <div>{{userInfo.nickName}}</div>
            <div>
              <div>
                <img src="@/assets/huiyuan@2x.png"
                     alt="">
                {{vipRule|dengji(this.userData)}}</div>
              <div><span>趣豆:</span> {{userData.discounts.integral.surplus_integral}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class='container-level'>
        <div class='title'>
          <img src="@/assets/icon-test@2x.png"
               alt="">
          会员等级
        </div>
        <ul class='level-description'>
          <div>
            <div>会员等级</div>
            <div>趣豆值</div>
            <div>说明</div>
          </div>
          <li v-for='item in vipRule.vipRules'
              :key='item.vipName'>
            <div>{{item.vipName}}</div>
            <div>{{item.standardNum}}-{{item.maxIntegral}}</div>
            <div>{{item.explain
              }}</div>

          </li>
        </ul>
        <div class='etc'
             v-if='ytRemark.ytRemark'
             v-html='ytRemark.ytRemark'>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { findVipRule, findUserInfo, findNotice } from '@/api'
export default {
  data () {
    return {
      userData: '',
      userInfo: '',
      vipRule: '',
      ytRemark: ''
    }
  },
  filters: {
    dengji (data, userData) {
      let jKey = ''
      let step = 0
      for (let key of data.vipRules) {

        if (userData.discounts.integral.surplus_integral >= key.standardNum && step <= key.standardNum) {
          step = key.standardNum
          jKey = key
        }
      }
      return jKey.vipName
    },
    quNumber () { }
  },
  async mounted () {
    await findUserInfo().then(res => {
      this.userData = res
      this.userInfo = res.userInfo
    })
    findNotice({
      noticeType: 6
    }).then(res => {
      this.ytRemark = res
    })
    findVipRule().then(res => {
      this.vipRule = res
    })

  },
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
#myBean {
  .header {
    height: 248px;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .nickIgm {
        width: 130px;
        height: 130px;
        padding: 0 40px;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .nickName {
        color: #111;
        > div {
          text-align: left;
          font-size: 28px; /*px*/

          img {
            width: 30px;
            margin-right: 6px;
            vertical-align: middle;
            position: relative;
            top: -4px;
          }
        }
        > div:nth-child(2) {
          display: flex;
          @include fjc;
          margin-top: 20px;
          font-size: 24px; /*px*/
          > div {
            margin-right: 40px;
          }
        }
      }
    }
  }
  .container-level {
    .title {
      height: 88px;
      text-align: left;
      @include fjc(center, flex-start);
      padding: 0 30px;
      color: #666;
      img {
        width: 24px;
        margin-right: 20px;
      }
    }
    .level-description {
      background: #fff;
      > div {
        @include fjc;
        height: 102px;
        div {
          flex: 1;
          padding: 30px;
          text-align: center;
        }
        > div:last-child {
          flex: 2;
        }
      }
      > li {
        @include fjc;
        @include border-top;
        > div {
          flex: 1;
          padding: 30px;
          text-align: center;
          box-sizing: border-box;
        }
        > div:last-child {
          flex: 2;
          line-height: 40px;
        }
      }
    }
    .etc {
      margin-top: 20px;
      background: #fff;
      padding:0 30px 30px;
      text-align: left;
      line-height: 44px;
      letter-spacing: 2px;
      font-size:26px;/*px*/
    }
  }
}
</style>
