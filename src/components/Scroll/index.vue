<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    bounce: {
      type: Boolean,
      default: true
    }
  },
  mounted () {


    this._initScroll()

  },
  methods: {
    _initScroll () {

      if (!this.$refs.wrapper) {
        return
      }


      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        HWCompositing: true,
        bounce:this.bounce,
      })


      this.scroll.scrollTo(0, '300px', 0)
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', pos => {
          // 派发事件获取pos 值


          _this.$emit('scroll', pos)
        })
      }
      // 上拉刷新
      if (this.pullUp) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 开始滚动前判断
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          let a = this.scroll.scrollerHeight;
          let b = this.scroll.wrapper.scrollHeight

          if (b - a > 15) {
            console.log(a, b, ' scroll');
            this.refresh();
          }
          this.$emit('beforeScroll')
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {


      this.scroll && this.scroll.refresh()
    },
    scrollTo () {


      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {

      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
