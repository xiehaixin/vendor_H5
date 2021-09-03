<template>
  <transition name="slide">
    <div class='coupon'>

      <nav class='tab-wrap'>
        <div :class='[active=="1"?"active":""]'
             @click="active = '1'">
          <a>有效 <span v-if='resData'>({{resData.usefulness.length}})</span> </a>
        </div>
        <div :class='[active=="2"?"active":""]'
             @click="active = '2'"> <a>即将过期 <span v-if='resData'>({{resData.comingSoon.length}})</span></a></div>
        <div :class='[active=="3"?"active":""]'
             @click="active = '3'"> <a>已过期 <span v-if='resData'>({{resData.expired.length}})</span></a></div>
      </nav>

      <scroll :listen-scroll="listenScroll"
              :probe-type="probeType"
              :data='forList'
              ref="list"
              class="scroll-list ">
        <div class='page-tab-container'>
          <div v-if='forList.length'>
            <my-item v-for='item in forList'
                     :key='item.code_id'
                     :data='item'
                     :class="[active==1||active==2?'usable':'',item.classTypeName=='贵宾券'&&!item.ifovertime?'addBg':'']"></my-item>
          </div>
          <div v-else-if='resData'
               class='no-list'>
            <div>
              <img src="@/assets/sale-icon@2x.png"
                   alt="">
            </div>
            <div>
              暂无相关优惠劵
            </div>
          </div>
        </div>

      </scroll>

    </div>
  </transition>
</template>
<script>

import Scroll from '@/components/Scroll/';
import { computeDown } from '@/common/js/dom';
import { getMyVouchers } from '@/api'
export default {
  data () {
    return {
      active: '1',
      resData: '',
      forList: [],
    }
  },
  components: {
    Scroll,

    myItem: () => import('./item'),

  },
  watch: {
    active (n) {

      n = Number(n);
      switch (n) {
        case 1:
          this.forList = this.resData.usefulness
          break;
        case 2:
          this.forList = this.resData.comingSoon
          break;

        default:
          this.forList = this.resData.expired
          break;
      }
    }
  },
  created () {
    this.probeType = 3;
    this.listenScroll = true;
    this.getMyVouchers();
  },
  mounted () {
    let fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size']);
    this.$refs.list.$el.style.top = fontSize * 1.493333 + 'px'
  },
  methods: {
    getMyVouchers () {
      this.loading.open('加载中...');
      getMyVouchers().then(res => {
        this.loading.close();
        let vendorArr = [];
        let resData = {
          usefulness: [],
          comingSoon: [],
          expired: [],
        };
        for (let key of res.vouchers) {
          if (key.isVendor) {
            vendorArr.push(key)
          }
        }

        for (let key of vendorArr) {

          //有效 //即将失效
          if (!key.ifUse && !key.ifovertime) {
            let overtime = key.overtime.replace(/-/g, '/');
            let overMin = new Date(overtime).getTime();
            let ret = computeDown((overMin - res.serviceTime) / 1000)
            if (ret.days <= res.timeoutDay) {
              resData.comingSoon.push(key)
            }
            resData.usefulness.push(key);
            continue;
          }
          //已过期
          if (!key.ifUse && key.ifovertime) {
            resData.expired.push(key);
            continue;
          }

        }
        this.resData = resData;
        this.forList = resData.usefulness
      })
    }
  },
 
}
</script>
<style lang="scss">
@import "@/common/scss/const.scss";
.coupon {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: $color-background-d;

  .tab-wrap {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background: #fff;
    z-index: 2;
    > div {
      flex: 1;
      text-align: center;

      > a {
        display: inline-block;
        height: 88px;
        line-height: 88px;
        color: #111;
        text-align: center;
      }
    }

    > .active {
      a {
        color: #111;
        border-bottom: 4px solid #f9d600;
      }
    }
  }

  .page-tab-container {
    padding: 0 32px 32px;
    box-sizing: border-box;
    .usable {
      .list-item {
        .c-top {
          background: linear-gradient(
            143deg,
            rgba(253, 226, 0, 1) 0%,
            rgba(249, 214, 0, 1) 100%
          );
          border-bottom: 2px dotted #fff;

          > div:first-child {
            span {
              color: #e24a4a;
              font-weight: 600;
            }
          }
        }

        .c-bottom {
          .make {
            background: #f9d600;
          }
        }
      }
    }
    .addBg {
      .list-item {
        .c-top {
          background: linear-gradient(
            90deg,
            rgba(241, 205, 141, 1) 0%,
            rgba(255, 221, 173, 1) 51%,
            rgba(232, 172, 97, 1) 100%
          );
        }
      }
    }
    .no-list {
      padding-top: 270px;
      img {
        width: 224px;
        height: 224px;
      }
      > div {
        color: #979797;
        font-size: 28px; /*px*/
      }
    }
  }
}
</style>
