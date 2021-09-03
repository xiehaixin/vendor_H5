<template>
  <div :class="bannerList.length > 0 ? 'swipe-banner' : 'my-header'">
    <div v-if="bannerList.length == 0"
      class='banner'>
      <img
        src="@/assets/banner@3x.png"
        alt=""
      >
      <hubbleBubble />

    </div>
    <div v-else-if='bannerList.length > 0'>
      <div class="banner-list">
        <mt-swipe :auto="4000">
          <mt-swipe-item
            v-for='(item,index) in bannerList'
            :key='index'
          >
            <img
              :src="item.bannerUrl"
              alt=""
            >

          </mt-swipe-item>

        </mt-swipe>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { homePageBanner } from '@/api'
import hubbleBubble from '@/views/Home/hubbleBubble/'

export default {
  name: 'home',
  data() {
    return {
      resData:null,
      bannerList: [

      ]
    }
  },
  components: {
    hubbleBubble
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      homePageBanner().then(res => {
        this.resData=res
        this.bannerList = this.resData.bannerList
      })
      /* this.resData = {bannerList:[]};
      this.bannerList = this.resData.bannerList //测试用 */
    }
  }
}
</script>

<style lang="scss">
.my-header {
  .banner {
    height: 320px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.swipe-banner{
  .banner-list {
    height: 350px;
    .mint-swipe {
      height: 350px;
    }
    img {
      width: 100%;
    }
  }
}

</style>
