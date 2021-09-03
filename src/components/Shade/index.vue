<template>
  <transition name="fade">
    <div class='shade'
         :value="value"
         v-if='visible'>
      <div class='shade-black'
           @click='visible=false'>

      </div>
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script>
 
export default {
  data () {
    return {
      visible: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value (val) {
 
      this.visible = val;
    },
    visible (val) {
      this.$emit('input', val);
    }
  },
  mounted () {

    if (this.value) {
      this.visible = true;
    }
  }
}
</script>
<style lang="scss">
@import "@/common/scss/mixin.scss";
.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  @include fjc;
  .shade-black {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  > div:last-child {
    position: relative;
    z-index: 1;
  }
}
</style>
