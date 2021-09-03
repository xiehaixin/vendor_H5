<template>
  <div class="order">
    <div class="tabs-nav">
      <div class="active">驿站订单</div>
      <div  @click='$router.push({path:"/orderOnline"})'>到家订单</div>
    </div>
    <scroll
      :data="list"
      :pullUp='pullUp'
      @scrollToEnd="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      ref="list"
      class="scroll-list"
    >
      <div>
        <ul
          class='list-ul'
          v-if='list.length'
        >
          <my-item
            v-for="(item, index) in list"
            :key="index"
            @cancel='cancelOrder'
            @openRepair='openRepairs'
            :item='item'
          ></my-item>
          <div
            v-if='resData&&!pullUp'
            class='bottom-dx'
          >
            <span></span>
            我们是有底线的<span></span>
          </div>
        </ul>
      </div>
    </scroll>
    <div
      class='not-order-text'
      v-if='list.length==0&&resData'
    >
      <div>
        亲，您还没有订单！<br />等你下单哟！<img
          src="@/assets/black/img-jdfb@2x.png"
          alt=""
        >
      </div>
    </div>
    <!-- 维修人信息 -->
    <repair
      v-model='activateRepair'
      :md5='MD5'
      :type='2'
    ></repair>
  </div>
</template>

<script>
// @ is an alias to /src

import { findMyOrders, cancellationOfOrder } from '@/api/index'
import Scroll from '@/components/Scroll/'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [],
      resData: null,
      listQuery: {
        lastCount: 0,
        count: 10
      },
      scrollY: 0,
      activateRepair: false,
      MD5: ''
    }
  },

  components: {
    myItem: () => import('./myItem'),
    repair: () => import('@/components/Repair'),
    Scroll
  },
  created() {
    this.probeType = 1
    this.listenScroll = true
    this.pullUp = true
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.list.$el.style.top = `60px`
    })
  },
  methods: {
    getFindMyOrders() {
      let lastCount  = this.listQuery.lastCount;
      if (lastCount == 0) {
        this.loading.open('加载中...')
      }

      findMyOrders(this.listQuery).then(res => {
        this.resData = res
        this.listQuery.lastCount=res.lastCount
        if (lastCount  > 1) {
          if (!res.orders.length) {
            this.toast({
              message: '亲,到底了',
              position: 'bottom',
              duration: 5000
            })
            this.pullUp = false
          } else {
            this.list = this.list.concat(res.orders)
          }
        } else {
          this.list = res.orders
        }

        if (lastCount  == 0) {
          this.loading.close()
        }
      })
    },
    /**取消支付 */
    cancelOrder(item) {
      cancellationOfOrder({
        orderNo: item.orderNo
      }).then(res => {
        this.listQuery.lastCount = 0
        this.startTimeCount(null)
        this.getFindMyOrders()
      })
    },

    scroll(pos) {
      if (this.pullUp) {

        this.getFindMyOrders()
      }
    },
    /**打开货柜人信息 */
    openRepairs(item) {
      this.activateRepair = true
      this.MD5 = item.mainboardNoMD5
    },
    ...mapActions({
      startTimeCount: 'setOrderTime'
    })
  },
  activated() {
    console.log(this.$route)

    this.pullUp = true
     this.listQuery.lastCount = 0
    this.getFindMyOrders()
  }
}
</script>

<style lang="scss">
.tabs-nav{
   display: flex;
   justify-content: space-around;
   background-color: #fff;
   font-size: 32px;
   line-height: 3em;
   color: #060606;
   div{
     width: 50%;
   }
   .active{
     color: #FFC400;
     border-bottom: 5px solid #FFC400;
   }
}
.scroll-list{
  top: 60px;
}
.bottom-dx {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  span {
    display: inline-flex;

    width: 104px;
    border: 2px dashed #1111;
    margin: 0 30px;
  }
}
.not-order-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  height: calc(100% - 100px);
  > div {
    font-size: 28px; /*px*/
    img {
      width: 54px;
      vertical-align: bottom;
    }
  }
}
</style>
