<template>
    <transition name="fade">
        <div
            class="attention"
           
        >
            <div
                class='myCont'
                :style='{backgroundImage:"url("+url+")"}'
            >
                <div class='cel-row'>
                    <img
                        src="@/assets/icon-phone @2x.png"
                        alt=""
                    >
                    <input
                        type="number"
                        v-model='form.cellphone'
                        placeholder='请输入手机号'
                    >
                </div>
                <div class='cel-row'>
                    <img
                        src="@/assets/icon-yzm @2x.png"
                        alt=""
                    >
                    <input
                        type="number"
                        v-model='form.code'
                        placeholder='请输入验证码'
                    >
                    <button
                        class='code'
                        :disabled='step<60'
                        @click='getCode'
                    >
                        {{getCodeTime}}
                    </button>
                </div>
                <button
                    class='btn'
                    @click='submit'
                >
                    注册
                </button>

            </div>
            <div class='close-x'>
                <img
                    :src="require('@/assets/datiTuOff.png')"
                    @click='close'
                    alt="关闭"
                >
            </div>
        </div>
    </transition>
</template>

<script>
import { moblieMsg, saveBind } from '@/api'
import { Indicator, Toast } from 'mint-ui'
import { checkPhone } from '@/common/js/verification'
export default {
  components: {},
  data() {
    return {
        url:'',
      form: {},
      timer: '',
      step: 60
    }
  },

 
  computed: {
    getCodeTime() {
      let { step } = this
      console.log(step <= 60)

      return step >= 60 ? '发送验证码' : step + 's'
    }
  },
  mounted(){
 
      this.url=this.$route.query.url
      
  },
  methods: {
    async submit() {
      let { cellphone, code } = this.form
      if (!checkPhone(cellphone)) {
        Toast('手机号码格式有误')
        return
      } else if (!code) {
        Toast('请输入验证码')
        return
      }

      try {
        Indicator.open({
          text: '发送中...',
          spinnerType: 'fading-circle'
        })
        await saveBind(this.form)
        Toast({
          message: '注册成功',
          iconClass: 'icon icon-success'
        })
        Indicator.close()
        let me = this
        setTimeout(() => {
          me.$router.go(-1)
        }, 1500)
      } catch (err) {
        Indicator.close()
      }
    },
    async getCode() {
      let me = this
      let { cellphone } = this.form
      if (!checkPhone(cellphone)) {
        Toast('手机号码格式有误')
        return
      }
      Indicator.open({
        text: '发送中...',
        spinnerType: 'fading-circle'
      })

      try {
        await moblieMsg({
          cellphone: this.form.cellphone
        })
        Indicator.close()
        me.timer = setInterval(() => {
          if (me.step <= 0) {
            clearInterval(me.timer)
            me.step = 61
          }
          me.step -= 1
        }, 1000)
      } catch (err) {
        Indicator.close()
      }
    },
    close() {
     this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.attention {
 
  width: 100%;
  height: 100vh;
 
  background: rgba(0, 0, 0, 0.8);
  @include fjc;
      flex-flow: row wrap;
  .myCont {
    position: relative;
    @include fjc(center, flex-end);
     flex-flow: column wrap;
    background: #fff;
    width: 674px;
    height: 998px;
    border-radius: 8px;
    padding: 30px 0;
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
    .cel-row {
      background: #fff;
      width: 642px;
      @include fjc;
      border-radius: 8px;
      margin-bottom: 18px;
      box-sizing: border-box;
      padding: 0 20px;
      img {
        width: 35px;
        height: 42px;
      }
      input {
        flex: 1;
        height: 88px;
        box-sizing: border-box;
        border: 0;
        padding-left: 20px;
        outline: none;
      }
      .code {
        width: 190px;
        align-self: stretch;
        @include fjc;
        background: transparent;
        position: relative;
        white-space: nowrap;
        &::before {
          position: absolute;
          content: '';
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          height: 35px;
          width: 1px;
          background: #cccccc;
        }
      }
    }
    .btn {
      height: 80px;
      border-radius: 60px;
      background: #fe5e4e;
      color: #ffe9ba;
      width: 642px;
      margin-top: 20px;
      @include fjc(center);
      text-align: center;
      font-size: 28px; /*px*/
    }
  }
  .close-x {
      
    img {
      padding: 20px;
      width: 56px;
      height: 56px;
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