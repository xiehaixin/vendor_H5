<template>

  <div class='repair-div'>
    <div
      class='black-wrap'
      v-if='visible'
    >

    </div>
    <transition name="slideBottom">
      <div
        class='my-content'
        v-if='visible'
      >
        <div class='header-img'>
          <img
            :src="data.picture"
            alt=""
          >
        </div>
        <div class='bis'>
          趣掌柜 ：{{data.name}}
        </div>
        <div class='tel'>
          {{data.phone}}
        </div>
        <div class='btn'>
          <div
            @click='unpacking(isLockingData.isUnlocking)'
            :class='[isLockingData.isUnlocking?"visible":""]'
            v-if='type==1'
          >再次开箱</div>
          <div><a :href="'tel:'+data.phone">拨打电话</a> </div>
        </div>
        <div
          v-if='isLockingData&&isLockingData.isUnlocking&&countDown'
          class='count-down'
        >
          亲，可在<span>{{countDown.min}}</span>分<span>{{countDown.sec}}</span>秒内再次开箱
        </div>
        <!-- <div
          v-if='openTime<=30'
          class='count-down'
        >
          正在开锁中<span>{{openTime}}s</span>
        </div> -->

        <div class='permit'>
          <img
            :src="data.healthCard"
            alt=""
          >
        </div>
        <div class='close'>
          <img
            src="@/assets/datiTuOff.png"
            @click='visible=false'
            alt="关闭"
          >
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
import { Toast } from 'mint-ui'
import { computeDown } from '@/common/js/dom.js'
import {
  findAccountByMainboardNoMD5,
  againUnlocking,
  isAgainUnlocking
} from '@/api'
export default {
  data() {
    return {
      visible: false,
      data: '',
      isLockingData: '',
      countDown: '',
      openTime: 31
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    md5: ''
  },
  watch: {
    value(val) {
      if (this.md5 && val) {
        this.getContact(this.md5)
      } else if (this.data) {
        this.visible = val
      } else {
        this.getContact()
      }
      if (this.type == 1 && val && !this.isLockingData) {
        this.getIsAgainUnlocking()
      }
    },
    visible(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    getContact(md5) {
      this.loading.open('加载中...')
      let parame = ''
      if (md5) {
        parame = {
          mainboardNoMD5: md5
        }
      }
      findAccountByMainboardNoMD5(parame).then(res => {
        this.loading.close()
        this.data = res.account[0]
        this.visible = true
      })
    },
    /**再次开锁 */
    unpacking(open) {
      if (!open) {
        return
      }
      this.loading.open('加载中...')
      let _that = this
      let doorIndex = localStorage.getItem('payDoor') || 8
      let orderId = localStorage.getItem('payOrderId') || 993
      againUnlocking({
        orderId,
        doorIndex
      }).then(res => {
        this.loading.close()
        if (res > -1) {
          Toast({
            message: '发送成功!',
            duration: 5000
          })
       
          // _that.openTime = 30
          // _that.timer = setInterval(() => {
          //   _that.openTime -= 1
          //   if (_that.openTime <= 0) {
          //     clearInterval(_that.timer)
          //     _that.openTime = 31
          //   }
          // }, 1000)
        } else {
          _that.isLockingData.isUnlocking = false
          Toast({
            message: '您无权开箱，请联系管理员',
            duration: 5000
          })
        }
      })
    },
    getIsAgainUnlocking() {
      this.countDown = ''
      clearInterval(this.timer)
      let _that = this
      let orderId = localStorage.getItem('payOrderId') || 635
      isAgainUnlocking({ orderId }).then(res => {
        this.isLockingData = res
        let second = res.time
        if (!res.isUnlocking) {
          return
        }
        this.timer = setInterval(() => {
          this.countDown = computeDown(second)
          second -= 1
          if (second <= 0) {
            clearInterval(this.timer)
            _that.countDown = ''
            _that.isLockingData.isUnlocking = false
            timer = null
          }
        }, 1000)
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.repair-div {
  position: relative;

  z-index: 30;
}
.black-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.my-content {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 5%;
  width: 90%;
  border-radius: 32px 32px 0 0;
  padding: 156px 0 32px;
  .header-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 224px;
    border-radius: 100%;
    overflow: hidden;
    height: 232px;
    box-shadow: 0px 6px 0px rgba(0, 0, 0, 0.16);
    background: #fff;
    @include fjc;
    img {
      width: 100%;
    }
  }
  .bis,
  .tel {
    font-size: 32px; /*px*/
    @include color111;
    margin-bottom: 16px;
  }
  .btn {
    @include fjc;
    padding-bottom: 37px;
    > div {
      width: 176px;
      height: 64px;
      margin-top: 16px;
      border-radius: 8px;
      font-size: 28px; /*px*/
      @include fjc;
      border: 2px solid #979797; /*px*/
      color: #979797;
      a {
        color: #979797;
        text-decoration: none;
      }
    }

    > div:last-child {
      margin-left: 40px;
    }
    > div:first-child {
      margin-left: 0;
    }
    > .visible {
      border: 2px solid $color-red; /*px*/
      color: $color-red;
    }
  }
  .count-down {
    padding-bottom: 35px;
    font-size: 24px; /*px*/

    span {
      color: $color-red;
    }
  }
  .permit {
    width: 566px;
    min-height: 350px;
    margin: auto;
    img {
      width: 100%;
    }
  }
  .close {
    position: absolute;
    right: 4px;
    top: 4px;
    padding: 20px;
    img {
      width: 45px;
    }
  }
}
.slideBottom-enter-active,
.slideBottom-leave-active {
  transition: all 0.4s ease;
}
.slideBottom-enter,
.slideBottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
</style>
