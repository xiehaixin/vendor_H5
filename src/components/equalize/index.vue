<template>
    <div class="ani-wrap" v-show='visible'>
        <div>
            <div
                class="c1  animated my-bounceOut "
                
            >
                <img
                    src='https://xcxcdn.shuiqoo.cn/height.png'
                    class='guangyun'
                />

                <img
                    src='https://xcxcdn.shuiqoo.cn/middle.png'
                    mode='widthFix'
                    class='move1'
                />
                <img
                    src='https://xcxcdn.shuiqoo.cn/middle.png'
                    mode='widthFix'
                    class='move2'
                />
                <img
                    src='@/assets/dov@2x.png'
                    class='doc'
                />
            </div>
        </div>
        <div class="asck-wrap ">
            <img src="@/assets/sack.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        visible:false,
    }
  },
  props:{
      value:''
  },
  watch:{
      value(val) {
          console.log(val,1111)
      this.visible = val
      let that=this
      setTimeout(()=>{
          that.visible=false
      },3200)
    },
    visible(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
.ani-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  .asck-wrap{
      padding-top: 200px;
      img{
          width: 230px;
      }
  }
}

.trant {
  animation-duration: 1s;
  animation-name: adeOut;
}

.my-bounceOut {
  -webkit-animation-duration: 3s;
  animation-duration:3s;
  -webkit-animation-name: mybounceOut;
  animation-name: mybounceOut;
}

.c1 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 300px;
  perspective: 200px;
  margin-top: 150px;
  .move1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    animation: mymove1 1s infinite cubic-bezier(1, 1, 1, 1);
  }
  .guangyun {
    width: 300px;
    height: 300px;
    z-index: 14;
  }

  .fixed {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 13;
    width: 280px;
    height: 280px;
  }
  .move2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    animation: mymove1 1s infinite cubic-bezier(1, 1, 1, 1);
    animation-delay: 0.5s;
  }
  .doc {
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%,-50%);
          width: 90px;
      z-index: 100;

  }
}
@keyframes adeOut {
  0% {
  }

  80% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes myZoom {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
  }
}
@keyframes mybounceOut {
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  20%,
  25% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  50% {
    opacity: 1;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3) translate(0, 1500px);
  }
}
@keyframes mymove1 {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  5% {
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}
</style>
