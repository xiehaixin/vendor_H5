<template>
  <div id='purse-record'>
    <div class='title'>
      <div>
        <div>活动</div>
        <div>红包金额</div>
        <div>状态</div>
      </div>
    </div>
    <ul class='list-od'>
      <li v-for='item in dataList.recordList'
          :key='item.recordId'>
        <div>{{item.createTime}}</div>
        <div>{{item.redpackMoney}}</div>

        <div :class='[item.sendStatus===0||item.sendStatus===-1?"gray":"success"]'
             @click='beam(item)'>
          {{item.sendStatus|statusName}}<br />
          {{item.sendStatus===0?'点击重发':""}}
          {{item.sendStatus===-1?'点击发送':""}}

        </div>

      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { getVendorRedpackUserRecord, commonRedPacketSendDetection } from '@/api'
export default {
  data () {
    return {
      dataList: ''
    }
  },
  filters: {
    statusName (status) {
      console.log(status)
      let text = ''
      switch (status) {
        case -1:
          text = '发送失败'
          break;
        case 2:
          text = '发送成功'
          break;
        default:
          text = '未发送'
          break;
      }
      return text
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getVendorRedpackUserRecord().then(res => [
        this.dataList = res
      ])
    },
    beam (item) {
      commonRedPacketSendDetection({
        recordId: item.recordId
      }).then(res => {
        Toast({
          message: '提交成功',

          duration: 2000
        });
        this.init()
      })
    }
  },
}
</script>
<style lang="scss">
@import '@/common/scss/mixin.scss';
#purse-record {
  background: #fff;
  min-height: 100vh;
  .title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    background: #fff;
    z-index: 5;
    > div {
      height: 88px;
      @include border-bottom;
      @include fjc;
      > div {
        flex: 1;
        font-size: 28px; /*px*/
      }
    }
  }
  .list-od {
    margin-top: 88px;
    li {
      display: flex;
      @include fjc;
      height: 108px;
      font-size: 28px; /*px*/
      @include border-bottom;
      > div {
        flex: 1;
      }
      > div:first-child {
        color: #999;
      }
      > div:nth-child(2) {
        color: #10c339;
        color: #e24a4a;
      }
    }
    li:last-child {
      &::before {
        border: 0;
      }
    }
    .gray {
      color: #979797;
    }
    .success {
      color: #10c339;
    }
  }
}
</style>
