<template>
  <transition name="fade">
    <div class="sidebar">
      <ul>
        <li v-for="(item,index) in  classData"
            @click='clickTwoSons(item)'
            v-if="index<=3"
            :class='[sonsActive==item.classId?"activeColor":""]'
            :key='item.classId'>
            <img src="@/assets/run.gif" alt="" style='width:21px;height:auto;margin-right:6px' v-if='item.classId==3'>
          {{item.className}}
        </li>
      </ul>
      <div class='gift'
           :class='[sonsActive===-1?"activeColor":""]'
           @click='clickTwoSons(-1)'>
        <div id="container"
             :class='[isGif?"shake-hard":""] '>
          <div id="string"></div>
          <div id="lid">
            <div id="front"
                 class="front face">
              <div class="ribbon"></div>
            </div>
            <div id="back"
                 class="back face">
              <div class="ribbon"></div>
            </div>
            <div id="left"
                 class="left face">
              <div class="ribbon"></div>
            </div>
            <div id="right"
                 class="right face">
              <div class="ribbon"></div>
            </div>
            <div id="top"
                 class="top face">
              <div class="ribbon"></div>
              <div class="ribbon"></div>
            </div>
          </div>
          <div id="box">
            <div id="front"
                 class="front face">
              <div class="ribbon"></div>
            </div>
            <div id="back"
                 class="back face">
              <div class="ribbon"></div>
            </div>
            <div id="left"
                 class="left face">
              <div class="ribbon"></div>
            </div>
            <div id="right"
                 class="right face">
              <div class="ribbon"></div>
            </div>
            <div id="bottom"
                 class="bottom face">
              <div class="ribbon"></div>
              <div class="ribbon"></div>
            </div>
          </div>
        </div>
        <span></span>礼品
      </div>
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import myHeader from "@/views/Home/myHeader";

export default {
  data () {
    return {
      wrapHeight: 0,
      openPullDown: false,
      sonsActive: -2,
    }
  },
  props: {
    value: '',
    classData: null,
    isGif: null,
  },
  watch: {
    value (n) {
      this.sonsActive = n
      if (!n) {
        this.sonsActive = -2
      }
    },
    openPullDown (n) {
      if (n) {

        let _that = this;
        _that.wrapHeight = this.$refs.itemRefs[0].clientHeight * this.classData.length;
      } else {
        this.wrapHeight = 0
      }
    }
  },
  components: {
    myHeader
  },
  mounted () {

  },
  methods: {
    // clickOpen () {
    //   this.openPullDown = !this.openPullDown;
    // },
    closeWrap (e) {
      if (e.target.className == 'pull-down-wrap') {
        this.openPullDown = false;
      }
    },

    clickTwoSons (item) {

      if (this.sonsActive === item.classId) { return }

      if (item === -1) {
        this.$emit('change', {classId: -1 })
      } else
        if (item.classId === -2) {
          this.$emit('change', '')
        } else {
          this.$emit('change', item)
        }
      this.openPullDown = false;

    }
  }
};
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
.sidebar {
  @include fjc(center, space-between);
  background: #fff;
  position: relative;
  overflow: hidden;
  > ul {
    @include fjc(center, flex-start);
    flex:1;
    height: 88px;
    li {
      flex:1;
      font-size: 26px; /*px*/
      padding: 15px 0;
      border-radius: 8px;
      align-self: stretch;
      color: #979797;
      @include fjc;
      img {
        height: 25px;
        min-width: 25px;
        position: relative;
        top: -2px;
      }
    }
  }
  .gift {
    width: 200px;
    @include fjc;
    box-shadow: -1px 0px 9px #c1c1c1;
    position: relative;
    align-self: stretch;
    > span {
      width: 30px;
    }
    img {
      width: 40px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
  .activeColor {
    position: relative;
    font-size: 30px; /*px*/
    @include color111;
    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 4px;
      background: $style-a;
      left: 0;
      bottom: 0;
    }
  }
}
.shake-hard {
  left: 10% !important;
  animation: swing 1400ms infinite alternate ease-in-out;
}

#string {
  width: 10px;
  border-right: 1px solid #ddd;
  height: 33px;
  -webkit-transform: translate3d(10px, 0, 0);
  transform: translate3d(10px, 0, 0);
}

#container {
  position: absolute;
  left: 15%;
  top: 0;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
  width: 20px;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
  -webkit-transition: -webkit-transform 1s ease-out;
  transition: -webkit-transform 1s ease-out;
  transition: transform 1s ease-out;
  transition: transform 1s ease-out, -webkit-transform 1s ease-out;
}

#box {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

#lid {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translate3d(-1px, 0, 0);
  transform: translate3d(-1px, 0, 0);
}
#lid .face {
  width: 22px;
  height: 5px;
  background: #ffc400;
}
#lid .face.top {
  height: 22px;
}
#lid .face.front {
  -webkit-transform: rotateY(0deg) translateZ(11px);
  transform: rotateY(0deg) translateZ(11px);
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
}
#lid .face.back {
  -webkit-transform: rotateX(180deg) translateZ(11px);
  transform: rotateX(180deg) translateZ(11px);
  box-shadow: 0px -3px 2px rgba(0, 0, 0, 0.1);
}
#lid .face.left {
  -webkit-transform: rotateY(-90deg) translateZ(11px);
  transform: rotateY(-90deg) translateZ(11px);
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
}
#lid .face.right {
  -webkit-transform: rotateY(90deg) translateZ(11px);
  transform: rotateY(90deg) translateZ(11px);
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
}
#lid .face.top {
  -webkit-transform: rotateX(90deg) translateZ(11px);
  transform: rotateX(90deg) translateZ(11px);
}
#lid .face.bottom {
  -webkit-transform: rotateX(-90deg) translateZ(11px);
  transform: rotateX(-90deg) translateZ(11px);
}

.face {
  width: 20px;
  height: 20px;
  background: #ffc400;
  position: absolute;
  display: inline-block;
  color: white;
  font-size: 2rem;
  opacity: 1;
}
.face.front {
  -webkit-transform: rotateY(0deg) translateZ(10px);
  transform: rotateY(0deg) translateZ(10px);
}
.face.back {
  -webkit-transform: rotateX(180deg) translateZ(10px);
  transform: rotateX(180deg) translateZ(10px);
}
.face.left {
  -webkit-transform: rotateY(-90deg) translateZ(10px);
  transform: rotateY(-90deg) translateZ(10px);
}
.face.right {
  -webkit-transform: rotateY(90deg) translateZ(10px);
  transform: rotateY(90deg) translateZ(10px);
}
.face.top {
  -webkit-transform: rotateX(90deg) translateZ(10px);
  transform: rotateX(90deg) translateZ(10px);
}
.face.bottom {
  -webkit-transform: rotateX(-90deg) translateZ(10px);
  transform: rotateX(-90deg) translateZ(10px);
}
.face .ribbon {
  position: absolute;
  background: #ccd;
  border-right: 1px solid rgba(255, 255, 255, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.95);
  width: 20%;
  height: 100%;
  margin: 0 40%;
}
.face .ribbon:nth-of-type(2) {
  width: 100%;
  height: 20%;
  margin: 40% 0;
}

@-webkit-keyframes swing {
  0% {
    -webkit-transform: rotateY(-30deg) rotateZ(40deg);
    transform: rotateY(-30deg) rotateZ(40deg);
  }
  100% {
    -webkit-transform: rotateY(30deg) rotateZ(-40deg);
    transform: rotateY(30deg) rotateZ(-40deg);
  }
}

@keyframes swing {
  0% {
    -webkit-transform: rotateY(-30deg) rotateZ(40deg);
    transform: rotateY(-30deg) rotateZ(40deg);
  }
  100% {
    -webkit-transform: rotateY(30deg) rotateZ(-40deg);
    transform: rotateY(30deg) rotateZ(-40deg);
  }
}
</style>
