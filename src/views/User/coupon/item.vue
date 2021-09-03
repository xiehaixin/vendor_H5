<template>
  <div>
    <div class='list-item'>

      <div class='c-top'>
        <div>
          <span>{{data.convert_money}}</span>
          元(优惠劵)

        </div>
        <div>
          适用地区: <span>{{data.cityName}}</span>
        </div>
        <img class='logo'
             src="@/assets/img-logo-right@2x.png"
             alt="">
      </div>
      <div class='c-bottom'>
        <div>
          {{data.pname}}
        </div>
        <div>{{data.begintime}}-{{data.overtime}}</div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: ''
  }
}
</script>
<style lang="scss">
.list-item {
  margin-bottom: 24px;
  .c-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 96px;
    color: #111;
    position: relative;
    background: #fff;
    border-radius: 10px 10px 0 0;
    border-bottom: 2px dotted #eeeeee;

    > div:first-child {
      span {
        font-size: 48px;
        font-weight: 600;
        /*px*/
      }
    }

    > div:nth-child(2) {
      position: relative;
      z-index: 2;

      span {
        padding-left: 10px;
      }
    }

    .logo {
      position: absolute;
      right: 0;
      top: 0;
      width: 114px;
    }

    &:after {
      content: "";
      width: 16px;
      height: 16px;
      background: #f8f8f8;
      border-radius: 100%;
      position: absolute;
      bottom: -8px;
      right: -8px;
      z-index: 2;
    }
  }

  .c-bottom {
    height: 120px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    position: relative;
    align-content: center;

    box-shadow: 0px 4px 8px 0px rgba(153, 153, 153, 0.13);
    border-radius: 0 0 10px 10px;
    background: #fff;

    > div {
      width: 100%;
      text-align: left;
      color: #999;
    }

    > div:first-child {
      padding-bottom: 10px;
    }

    > .make {
      width: 128px;
      height: 48px;
      position: absolute;
      right: 24px;
      bottom: 24px;
      font-size: 24px;
      /*px*/
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eeeeee;
      border-radius: 8px;
    }

    &:after {
      content: "";
      width: 16px;
      height: 16px;
      background: #f8f8f8;
      border-radius: 100%;
      position: absolute;
      top: -8px;
      left: -8px;
      z-index: 2;
    }
  }
}
</style>
