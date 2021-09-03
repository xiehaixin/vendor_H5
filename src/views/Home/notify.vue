<template>
  <div class="notify">
    <div class='notiyf-wrap'
         @click='show=true'>
      <i class='iconfont icon-tongzhixiaolaba'
         :class="['color_'+$store.state.styleColor]"></i>
      <div class='contant'>
        <div ref='move'>
          <span v-for='(item,index) in data.broadcasts'
                @click='showContData(item)'
                :key='index'>
            {{index>0?'&#12288; &#12288; &#12288; &#12288; &#12288; &#12288;':""}} {{index+1}}. {{item.ve_title }}: {{item.ve_message}}

          </span>

        </div>
        <div class='clean'>

        </div>
      </div>
    </div>

    <div class='showDonw'
         v-if='aContShow'>
      <div class='black'
           :class='[!show?"opacity":""]'
           @click='show=false'>
      </div>
      <div class='black-contant animated'
           ref='removeClass'
           :class="[show?'bounceInDown':'bounceOutUp']">
        <div class='title'>
          <div class='lf'> {{sContant.ve_title}}</div>
          <i class='iconfont icon-tcxx-off-icon'
             @click='show=false'></i>

        </div>
        <div class='text-cont'>
          {{sContant.ve_message}}
        </div>
        <div class='round'>
          <i class="iconfont icon-tongzhixiaolaba"
             :class="['color_'+$store.state.styleColor]"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      show: false,
      sContant: '',
      aContShow: false,
    }
  },
  props: {
    data: ''
  },
  components: {

  },
  watch: {
    show (n) {
      let that = this;
      if (n == false) {

        let timer = setTimeout(() => {
          that.aContShow = false;
          timer = null;
        }, 500);
      } else {
        that.aContShow = true;
      }
    },
    $route (n, x) {
      if (x.name == 'home') {
         

        this.show = false;
      }
    }
  },
  methods: {
    showContData (item) {
      this.sContant = item;
    },
  },
  mounted () {
    let that = this;

    let num = 0;
    this.sContant = this.data.broadcasts[0]
    for (let key of this.data.broadcasts) {

      num += key.ve_title.length
      num += key.ve_message.length
    }
    num = (this.data.broadcasts.length - 1) * 6 + num;
    this.$refs.move.style.animationDuration = Math.ceil(num / 50) * 10000 + 'ms'


  },

}
</script>

<style scoped lang="scss">
.notiyf-wrap {
  display: flex;
  padding: 0 15px;
  height: 64px;
  align-items: center;
  i {
    font-size: 40px;
  }
  .contant {
    flex: 1;
    padding: 0 30px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    color: rgb(18, 123, 243);
    font-size: 28px; /*px*/
    height: 64px;
    > div {
      position: absolute;
      left: 0;
      top: 0;
      height: 64px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      min-width: 100%;
      animation: kf-marque-animation 12s infinite linear;
      span {
        display: inline-block;
      }
    }
  }
}
.showDonw {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  .black {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    transition: all 0.4s linear;
  }
  .opacity {
    opacity: 0;
  }
  .black-contant {
    position: relative;
    width: 640px;
    height: 436px;
    background: #fff;
    z-index: 12;
    border-radius: 12px;
    padding: 10px 30px 30px 30px;
    box-sizing: border-box;
    .title {
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f8f8f8;
      font-size: 30px; /*px*/

      .lf {
        position: relative;
        z-index: 10;
      }
      > i {
        font-size: 35px;
        color: #7b7b7b;
      }
    }
    .text-cont {
      background: #f7f7f7;
      height: 288px;
      padding: 24px;
      box-sizing: border-box;
      margin-top: 20px;
      overflow: scroll;
      text-align: left;
      line-height: 33px;
    }
    .round {
      position: absolute;
      top: 0%;
      left: 50%;
      width: 115px;
      height: 115px;
      background: #fff;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      i {
        font-size: 50px;
      }
    }
  }
}
.color_a {
  color: #ffc400 !important;
}

.color_b {
  color: #9013fe !important;
}

.color_c {
  color: #e24a4a !important;
}

.color_d {
  color: #4a90e2 !important;
}

.color_e {
  color: #2cc136 !important;
}

@keyframes kf-marque-animation {
  0% {
    transform: translateX(90vw);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
