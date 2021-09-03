<template>
  <transition name="fade">
    <div class='evaluates'>
      <div class="my-evaluate-content">

        <div class='jsy'
             :class='[visible?"border":""]'
             @click='showCont'>
          <div>
            亲，参与评价有机会中大奖，最高奖金：998元
          </div>

          <div>
            <i class='iconfont  '
               :class='[starIndex>=index?"icon-icon-xx-pre":"icon-icon-xx"]'
               @click.stop='selectStar(index)'
               v-for='(item,index) in 5'
               :key='item'></i>

          </div>
          <div class='close-x'
               v-show='visible'
               @click.stop='_close'>
            <i class='iconfont icon-guanbi-copy'></i>

          </div>
        </div>
        <div v-show='visible'>
          <ul class='list'>
            <li @click='oneClick=1'>
              <img :src="require('@/assets/black/img-jdfb@2x.png')">
              <div :class="[oneClick==1?'bg':'']">简单方便</div>
            </li>
            <li @click='oneClick=2'>
              <img :src="require('@/assets/black/img-fz@2x.png')">

              <div :class="[oneClick==2?'bg':'']">功能复杂</div>
            </li>

            <li @click='twoClick=1'>
              <img :src="require('@/assets/black/img-xjbg@2x.png')">

              <div :class="[twoClick==1?'bg':'']">性价比高</div>
            </li>
            <li @click='twoClick=2'>
              <img :src="require('@/assets/black/img-hnpym@2x.png')">

              <div :class="[twoClick==2?'bg':'']">还能便宜吗</div>
            </li>
          </ul>

          <textarea placeholder="更多建议"
                    class='textarea'
                    @click='textareaChange'
                    @blur='blurs'
                    v-model="introduction"> </textarea>

          <div class='btn'
               @click.stop='submit'
               :class="['theme_'+$store.state.styleColor]">
            提交评价建议
          </div>
          <p class='target'></p>
        </div>

        <!-- 评价完成后 -->
        <div class='complete-evaluation'
             v-show='disable'>
          <div>
            感谢您的评价
          </div>
          <div>

            <ul class='list'>
              <li v-if='oneClick==1'>
                <img :src="require('@/assets/black/img-jdfb@2x.png')">
                <div :class="[oneClick==1?'bg':'']">简单方便</div>
              </li>
              <li v-if='oneClick==2'>
                <img :src="require('@/assets/black/img-fz@2x.png')">

                <div :class="[oneClick==2?'bg':'']">功能复杂</div>
              </li>

              <li v-if='twoClick==1'>
                <img :src="require('@/assets/black/img-xjbg@2x.png')">

                <div :class="[twoClick==1?'bg':'']">性价比高</div>
              </li>
              <li v-if='twoClick==2'>
                <img :src="require('@/assets/black/img-hnpym@2x.png')">

                <div :class="[twoClick==2?'bg':'']">还能便宜吗</div>
              </li>
            </ul>

          </div>
          <div v-if='introduction'
               class='textarea'>
            {{introduction}}
          </div>
          <div class="bod-bot"></div>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
import { Field,Toast } from 'mint-ui';
export default {
  data () {
    return {
      strNum: 0,
      oneClick: 0,
      twoClick: 0,
      introduction: "",
      visible: false,
      starIndex: -1
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }

  },
  watch: {
    value (val) {
      this.visible = val;
    },
    visible (val) {
      this.$emit('input', val);
    }
  },
  methods: {
    _close () {
      this.$emit('close');
    },
    submit () {
      if (this.sratIndex < 0) { return }

      let oneClick = this.oneClick;
      let twoClick = this.twoClick;
      let introduction = this.introduction;
      if (oneClick || twoClick) {
        this.isShow = false;
        this.$emit('submit', { oneClick, twoClick, introduction, starNum: (this.starIndex + 1) });

      }else{
     Toast({
          message: '请评价功能',

          duration: 2000
        })
      }
    },
    selectStar (index) {
      if (this.disable) { return };
      if (!this.visible) { this.showCont() }
      this.starIndex = index;
    },
    showCont () {
      if (this.disable) { return };
      this.visible = true;


    },
    textareaChange(){

    },
    blurs(){
      console.log(window)
			window.scroll(0, 0);
		}

  },
}
</script>
<style lang="scss">
@import "@/common/scss/mixin.scss";
.evaluates {
  @include fjc;
  flex-flow: row wrap;
  align-content: center;
  .my-evaluate-content {
    background: #fff;
    border-radius: 8px;
    width: 100%;
    position: relative;
    padding-bottom: 48px;
    .jsy {
      position: relative;
      text-align: left;
      text-align: center;
      @include color111;
      padding: 48px 0 0;
      > div:nth-child(1) {
        font-size: 28px; /*px*/
      }
      > div:nth-child(2) {
        padding: 44px 0 0px;
        .iconfont {
          padding: 10px;
          font-size: 48px;
        }
        .icon-icon-xx {
          color: #d0d0d0;
        }
        .icon-icon-xx-pre {
          color: #f9d600;
        }
      }
      .close-x {
        position: absolute;
        right: 14px;
        top: 14px;
        padding: 6px;
        z-index: 2;
        i {
          font-size: 33px;
          color: #a5a5a5;
        }
      }
    }
    .border {
      border-top: 1px solid #ddd;
    }
    ul {
      padding: 40px 64px 0;
      overflow: hidden;
      @include fjc(center, space-between);

      flex-flow: row wrap;
      li {
        position: relative;
        padding-left: 10px;
        text-align: left;
        float: left;
        color: #111;
        box-sizing: border-box;

        min-width: 290px;
        img {
          position: relative;
          z-index: 2;

          width: 80px;
        }
        div {
          @include fjc;
          min-width: 220px;
          height: 64px;
          border: 2px solid rgba(239, 239, 239, 1);
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          left: 66px;
          transform: translate(0%, -50%);
          padding-left: 10px;
          border-radius: 0 64px 64px 0;
        }
        .bg {
          background: #f9d600;
          border: transparent;
        }
      }
      li:first-child,
      li:nth-child(2) {
        margin-bottom: 64px;
      }
    }

    .textarea {
      margin: auto;
      margin-top: 44px;
      text-align: left;
      color:#979797;
      width: 622px;
      min-height: 112px;
      background: rgba(248, 248, 248, 1);
      border: none;
      padding: 16px;
      box-sizing: border-box;
      font-size: 28px; /*px*/
    }

    .btn {
      width: 622px;
      height: 88px;
      color: #fff;
      @include fjc;
      margin: auto;
      border-radius: 8px;
      margin-top: 48px;
      font-size: 28px; /*px*/
    }
  }

  // 完成评价
  .complete-evaluation {
    > div:first-child {
      font-size: 24px;
      color: #cacaca;
      margin-top: 20px;
    }
    .list {
      li {
        margin: 0 !important;
      }
    }
    .bod-bot {
      height: 80px;
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
