<template>
  <div class="paopao">
    <div class="paoContext"
        >
      <div class="div-wrap"   @click="$router.push({ path: '/mineralElement'})"></div>
      <div class="selenium">
        <img :src="require('@/assets/Se_2x.png')"
             alt="">
      </div>
      <div class="calcium">
        <img :src="require('@/assets/Ca_2x.png')"
             alt="">
      </div>
      <div class="sodium">
        <img :src="require('@/assets/Na_2x.png')"
             alt="">
      </div>
      <div class="strontium">
        <img :src="require('@/assets/Sr_2x.png')"
             alt="">
      </div>
      <div class="zinc">
        <img :src="require('@/assets/Zn_2x.png')"
             alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  components: {

  }

}
</script>

<style scoped lang="scss">
.paopao {
  position: absolute;
  top: 0;
  right: 0;
  width: 160px;
  height: 160px;
  left: 440px;
  top: 40px;
  .div-wrap{
    position: absolute;
    top: -20%;
    left:-50%;
    width: 150%;
    height: 100%;
    z-index:10;
  }
}
.paoContext {
  img {
    width: 100%;
    height: 100%;
  }
  .selenium {
    /* 硒se */
    width: 10%;
    height: 10%;
    position: absolute;
    animation: Se 10s infinite;
    -webkit-animation: Se 10s infinite; /*Safari and Chrome*/
  }
  .calcium {
    width: 10%;
    height: 10%;
    position: absolute;
    animation: Ca 10s infinite;
    -webkit-animation: Ca 10s infinite; /*Safari and Chrome*/
  }
  .sodium {
    width: 10%;
    height: 10%;
    position: absolute;
    animation: Na 10s infinite;
    -webkit-animation: Na 10s infinite; /*Safari and Chrome*/
  }
  .strontium {
    width: 10%;
    height: 10%;
    position: absolute;
    animation: Sr 10s infinite;
    -webkit-animation: Sr 10s infinite; /*Safari and Chrome*/
  }
  .zinc {
    width: 10%;
    height: 10%;
    position: absolute;
    animation: Zn 10s infinite;
    -webkit-animation: Zn 10s infinite; /*Safari and Chrome*/
  }
  @keyframes Se {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }

    10% {
      opacity: 1;
    }
    18% {
      transform: translate(-100%, -80%);
      opacity: 1;
    }
    30% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(-100%, -80%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }
  @-webkit-keyframes Se {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }

    10% {
      opacity: 1;
    }
    18% {
      transform: translate(-300%, -80%);
      opacity: 1;
    }
    30% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(-300%, -80%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @keyframes Ca {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    20% {
      transform: translate(0, 0);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    38% {
      transform: translate(80%, -40%);
      opacity: 1;
    }
    50% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(80%, -40%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }
  @-webkit-keyframes Ca {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    20% {
      transform: translate(0, 0);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    38% {
      transform: translate(160%, -80%);
      opacity: 1;
    }
    50% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(160%, -80%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @keyframes Na {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    40% {
      transform: translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    58% {
      transform: translateY(-100%);
      opacity: 1;
    }
    70% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @-webkit-keyframes Na {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    40% {
      transform: translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    58% {
      transform: translateY(-300%);
      opacity: 1;
    }
    70% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translateY(-300%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @keyframes Sr {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    60% {
      transform: translate(0, 0);
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    78% {
      transform: translate(-40%, 90%);
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(-40%, 90%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @-webkit-keyframes Sr {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    60% {
      transform: translate(0, 0);
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    78% {
      transform: translate(-80%, 180%);
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 30%;
      height: 30%;
    }
    100% {
      transform: translate(-80%, 180%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @keyframes Zn {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    80% {
      transform: translate(0, 0);
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
    98% {
      transform: translate(30%, 80%);
      opacity: 1;
    }
    100% {
      transform: translate(30%, 80%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }

  @-webkit-keyframes Zn {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    80% {
      transform: translate(0, 0);
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
    98% {
      transform: translate(60%, 160%);
      opacity: 1;
    }
    100% {
      transform: translate(60%, 160%);
      opacity: 0;
      width: 30%;
      height: 30%;
    }
  }
}
</style>
