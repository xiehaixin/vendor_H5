<template>
  <div id="app">

    <!-- <guide v-if='isShowGuide'></guide> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <tab v-if='$route.name==="index"||$route.name==="order"||$route.name==="orderOnline"||$route.name==="user"'></tab>
  </div>
</template>
<script>
import { pageAuth } from '@/common/js/pageAuth'
export default {
  filters:{
showTab(){

}
  },
  data () {
    return {
      routeData: ''
    }
  },
  components: {
    tab: () => import('@/components/tab'),
    // guide: () => import('@/components/guide'),
  },

  created () {
    // let firstRecord = localStorage.getItem('firstRecord')
    // if (!firstRecord) {
    //   this.isShowGuide = true;
    //   localStorage.setItem('firstRecord', 1)
    // } else {
    //   localStorage.setItem('firstRecord', ++firstRecord)
    // }
    pageAuth();


  },
};
</script>
<style lang="scss">
@import '@/common/scss/index.scss';
@import '@/common/scss/animate.scss';

#app {
	font-family: Helvetica Neue, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #111;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 2s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
</style>
