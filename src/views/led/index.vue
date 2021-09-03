<template>
  <div class='ied-wrap'>

    <!-- <div class='mint-cell mint-field'>
      <div class='mint-cell-wrapper'>
        <div class='mint-cell-title'>
          <div>轮播方向</div>

        </div>
        <mt-switch v-model="form.dir">{{!form.dir?'左边':'右边'}}</mt-switch>
      </div>

    </div> -->
    <!-- <div class='mint-cell mint-field'>
      <div class='mint-cell-wrapper'>
        <div class='mint-cell-title'>
          <div>播放速度</div>

        </div>
        <mt-range
          v-model="form.adSpeed"
          :min='0'
          :max="10"
        >

          <div slot="end">{{form.adSpeed}}</div>
        </mt-range>
      </div>

    </div> -->
    <div class='mint-cell mint-field'>
      <div class='mint-cell-wrapper'>
        <div class='mint-cell-title'>
          <div>投放天数</div>

        </div>
        <mt-range
          v-model="form.days"
          :min='0'
          :max="120"
        >

          <div slot="end">{{form.days}}</div>
        </mt-range>
      </div>

    </div>
    <div class='textContent'>
      <div>广告内容</div>
      <div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="form.adContent"
          placeholder="请输入内容"
        ></textarea>
      </div>
    </div>

    <div class='move-wrap'>
      <div class='clt'>
        <img
          src="@/assets/led_cover.png"
          alt="随机立减"
        >
      </div>
      <div
        class='content'
        ref='refCont'
        :style="{transform: 'translateX(-'+step+'px)'}"
      >
        {{form.adContent}}
      </div>

    </div>
    <div class='submit'>
      <mt-button
        type="danger"
        size="large"
        @click.native="moveScroll"
      >预览</mt-button>
      <mt-button
        type="primary"
        size="large"
        :disabled='disabled'
        @click.native="handleClick"
      >保存</mt-button>
    </div>

  </div>
</template>
<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { downAdvertingToVendor, saveLEDOrder } from '@/api'

export default {
  data() {
    return {
      step: 0,
      timer: null,
      disabled: false,
      form: {
        adSpeed: 4,
        days: 1,
        adContent: ''
      }
    }
  },
  mounted() {},
  methods: {
    moveScroll() {
      if (!this.form.adContent) {
        this.toast({
          message: '请输入内容',
          position: 'middle',
          duration: 2000
        })
        return
      }
      this.toast({
        message: '正在生成中...',
        position: 'middle',
        duration: 2000
      })
      clearInterval(this.timer)

      let me = this

      let width = this.$refs.refCont.clientWidth
      let winWidth = window.screen.width

      let max = width + winWidth

      this.timer = setInterval(() => {
        me.step += (12 * me.form.adSpeed) / 100
        if (me.step > max) {
          me.step = 0
        }
      }, 10)
    },
    async handleClick() {
      let { form } = this
      if (!form.adContent) {
        this.toast({
          message: '请输入内容',
          position: 'middle',
          duration: 2000
        })
        return
      }
      let parame = Object.assign({}, form)
      this.loading.open('加载中...')
      this.disabled = true
      try {
        await saveLEDOrder(parame)
        this.$router.push('suc')

      } finally {
        this.disabled = false
              this.loading.close()
      }
 
      // Toast({
      //   message: '提交成功',
      //   iconClass: 'icon icon-success',
      //   duration: 2000
      // })
      // MessageBox({
      //   title:'操作成功',
      //   message: '提交成功，是否继续填写?',
      //   confirmButtonText: '继续',
      //   showCancelButton:true,
      //   cancelButtonText: '返回上页',
      //   closeOnClickModal:false
      // }).then(action => {
      //   if(action=='confirm'){
      //     this.form.adContent=''
      //   }else{
      //     this.$router.go(-1)
      //   }
      // })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/common/scss/mixin.scss';
input[type='text'],
textarea {
  -webkit-user-select: auto;
  -moz-user-select: auto;
  user-select: auto;
}

.mt-range {
  width: 100%;
}
.submit {
  padding: 100px 20px 20px 0;

  display: flex;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  button {
    flex: 1;
    margin-left: 20px;
  }
}
.move-wrap {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: scroll;
  text-align: left;
  display: flex;
  height: 68px;
  .clt {
    min-width: 100%;
    height: 68px;
    img {
      height: 68px;
      width: 100%;
    }
  }
  .content {
    height: 68px;
    flex: 1;
    line-height: 68px;
    display: inline-block;
    text-align: left;
    white-space: nowrap;
    padding: 0 30px;
    font-weight: 700;
    color: red;
    font-size: 28px;
    transform: translateX(-100%);
  }
}
.textContent {
  background: #fff;
  > div:nth-child(1) {
    height: 88px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    font-size: 30px; /*px*/
  }
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    outline: none;
    width: 90%;
    margin-bottom: 30px;
    box-sizing: border-box;
    -webkit-appearance: none;
    font-size: 28px; /*px*/
  }
}
</style>


