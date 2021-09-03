 <template>

  <transition name="fade">

    <div :class="['theme-'+$store.state.styleColor]"
         class="my-tab">
      <div id="index"
           :class='[selected=="index"?"is-selected":""]'
           @click='goTo("index")'>
        <img slot="icon"
             v-show='selected=="index"'
             :src="require('@/assets/index_active_'+$store.state.styleColor+'.png')">
        <img slot="icon"
             v-show='selected!=="index"'
             src="@/assets/index.png">
        <div> 首页 </div>
      </div>
      <div id="order"
           :class='[selected=="order" || selected=="orderOnline"?"is-selected":""]'
           @click='goTo("order")'>
        <img slot="icon"
             v-show='selected=="order" || selected=="orderOnline"'
             :src="require('@/assets/order_active_'+$store.state.styleColor+'.png')">
        <img slot="icon"
             v-show='selected!=="order" && selected!=="orderOnline"'
             src="@/assets/order.png">
        <div>订单</div>
      </div>
      <div id="user"
           :class='[selected=="user"?"is-selected":""]'
           @click='goTo("user")'>
        <img slot="icon"
             v-show='selected=="user"'
             :src="require('@/assets/my_active_'+$store.state.styleColor+'.png')">
        <img slot="icon"
             v-show='selected!=="user"'
             src="@/assets/my.png">
        <div> 我的 </div>
      </div>
    </div>

  </transition>
</template>
<script>

export default {
  data () {
    return {
      selected: '',
    };
  },
  watch: {
    $route (n) {
      if (this.selected != this.$route.name) {
        this.selected = this.$route.name
      }
    },

  },
  mounted () {
    let that = this;
    setTimeout(() => {
      if (!that.selected) {
        that.selected = that.$route.name
      }
    }, 700);

  },
  methods: {
    goTo(path){
      this.selected = path
      this.$router.push({path})
    }
  },
  activated () {
    console.log(123, this.$route.name);
  },
};
</script>
<style lang="scss" scoped>
@import "@/common/scss/mixin.scss";
.my-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: 100px;
  padding-bottom: env(safe-area-inset-bottom);
  @include fjc;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);
  > div {
    flex: 4;
    img {
      width: 48px;
      margin-bottom: 5px;
    }
    > div {
      font-size: 26px; /*px*/
    }
  }
}
.theme-a .is-selected {
  color: $style-a !important;
}
.theme-b .is-selected {
  color: $style-b !important;
}
.theme-c .is-selected {
  color: $style-c !important;
}
.theme-d .is-selected {
  color: $style-d !important;
}
.theme-e .is-selected {
  color: $style-e !important;
}
.mint-tabbar.is-fixed {
  box-sizing: content-box;
  padding-bottom: env(safe-area-inset-bottom) !important;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background: transparent;
}
</style>
