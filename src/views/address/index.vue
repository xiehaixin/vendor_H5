<template>
  <div class="address-wrap">
    <div class="no-wrap" v-if="!addressList.length">
      <img width="191px" height="127px" src="@/assets/noaddress.png" alt="" />
      <p>暂无地址</p>
      <el-button @click='addnewaddress' :class="['theme_' + $store.state.styleColor]">添加地址</el-button>
    </div>
    <div class="list-box" v-if="addressList.length">
      <ul class="list-wrap">
        <li v-for="(item, index) in addressList" :key="index">
          <div class="top" @click="chooseGoback(item)">
            <div class="user">
              <span class="name">{{item.contacts}}</span>
              <span>{{item.phone}}</span>
            </div>
            <div class="detail">{{ item.communityName + item.sendAddress }}</div>
          </div>
          <div class="bot">
            <div @click="setDefault(item)">
              <span v-if="!item.ifDefault" class="radio"></span>
              <i v-if="item.ifDefault" class="radio-checked el-icon-success"></i>
              设为默认
            </div>
            <div class="btns">
              <span @click="editAddress(item)">
                <i class="el-icon-edit"></i>
                编辑
              </span>
              <span @click="deleteAddress(item)">
                <i class="el-icon-delete"></i>
                删除
              </span>
            </div>
          </div>
        </li>
      </ul>
      <el-button :class="['theme_' + $store.state.styleColor]" @click='addnewaddress' class="add-new">添加地址</el-button>
    </div>
  </div>
</template>

<script>
import { findVendorClientAddrss,updateVendorClientAddrss,removeVendorClientAddrss } from '@/api'
import { MessageBox, Toast } from 'mint-ui';
export default {
  data() {
    return {
      addressList: [],
      confirm: 0,
      picture: '',
      price: 0,
      pid: null,
      name: ''
    };
  },
  created() {
    this.getAddressData()
  },
  mounted(){
      this.confirm = this.$route.query.confirm;
      this.pid = this.$route.query.pid;
  },
  methods: {
    addnewaddress(){
      this.$router.push({
        path: '/addAddress',
        query: {
          confirm: this.confirm,
          pid: this.pid
        }
      });
    },
    chooseGoback(e){
      if(!this.confirm){
        return false;
      }
      this.$router.push({
        path: '/confirm',
        query: {
          did: e.did,
          contacts: e.contacts,
          phone: e.phone,
          address: e.communityName + e.sendAddress,
          sendAddress: e.sendAddress,
          chooseback: 1,
          pid: this.pid
        }
      });
      console.log(e);
    },
    editAddress(e){
      this.$router.push({
        path: '/addAddress',
        query: {
          confirm: this.confirm,
          pid: this.pid,
          did: e.did,
          sendAddress: e.sendAddress,
          contacts: e.contacts,
          phone: e.phone,
          ifDefault: e.ifDefault
        }
      });
    },
    deleteAddress(e){
      removeVendorClientAddrss({
        did: e.did
      }).then(res => {
        Toast({
          message: '删除成功',
          position: 'middle',
          duration: 1000
        });
        this.getAddressData()
      })
    },
    setDefault(e){

      e.ifDefault = !e.ifDefault;
      updateVendorClientAddrss({
        did: e.did,
        sendAddress: e.sendAddress,
        contacts: e.contacts,
        phone: e.phone,
        ifDefault: e.ifDefault
      }).then(res => {
        Toast({
          message: '设置成功',
          position: 'middle',
          duration: 1000
        });
        this.getAddressData()
      })
    },
    getAddressData() {
      this.loading.open('加载中...')
      findVendorClientAddrss().then(res => {
        console.log(res)
        this.addressList = res;
        this.loading.close()
      })
    },
  }
};
</script>

<style lang="scss">
@import '@/common/scss/mixin.scss';
.address-wrap {
  .no-wrap {
    padding: 100px 20px 0;
    p {
      line-height: 3em;
      color: #7a7777;
      font-size: 36px;
      margin-bottom: 120px;
    }
    button {
      font-size: 32px;
      width: 80%;
    }
  }
  .list-box{
    .add-new{
      font-size: 32px;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #000;
      padding: 36px;
    }
    .list-wrap {
      font-size: 30px;
      li {
        background-color: #fff;
        padding: 30px 0;
        margin-top: 15px;
        text-align: left;
        line-height: 2em;
        .top {
          padding: 0 20px 20px;
          border-bottom: 1px solid #e6e6e6;
          .detail {
            color: #666;
          }
        }
        .bot {
          padding: 10px 20px 0;
          color: #333333;
          justify-content: space-between;
          display: flex;
          line-height: 1.8em;
          .radio {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin: 0 10px 0 0;
            position: relative;
            top: 6px;
            border: 2px solid #666;
            border-radius: 50%;
          }
          .radio-checked {
            font-size: 40px;
            color: #fec400;
            position: relative;
            top: 4px;
          }
          .btns {
            span {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }

}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #fec400;
  background-color: #fec400;
}
</style>
