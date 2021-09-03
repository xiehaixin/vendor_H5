<template>
    <div class='led-suc'>
        <div class='icon'>
            <div class='wrap'>
                <div class="check-style-equal-width"></div>

            </div>
        </div>
        <div class='text'>提交成功，请耐心等待管理员审核！</div>

        <div class='btn'>
            <mt-button
                size="small"
                type="primary"
                @click='openPage'
            >返回首页</mt-button>
            <mt-button
                size="small"
                type="danger"
                @click='back'
            >继续发布</mt-button>

        </div>
    </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    },
    openPage() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scope>
.led-suc{
.btn {
  display: flex;
  padding: 30px;
  justify-content: center;
  > button:nth-child(2) {
    margin-left: 70px;
    background: #fdc849;
  }
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 80px;
  .wrap {
    background: #fdc849;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.check-style-equal-width {
  width: 45px;
  height: 76px;
  border-color: #fff;
  border-style: solid;
  position: relative;
  top: -15px;
  border-width: 0 8px 8px 0;
  transform: rotate(45deg);
}
.text {
  font-size: 28px; /*px*/
  margin-bottom: 50px;
}
}
</style>
