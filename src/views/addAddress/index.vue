<template>
  <div class="add-wrap">
    <mt-field label="联系人" placeholder="请输入联系人" v-model="contacts"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="详细地址" placeholder="只需填写几栋几单元及门牌号" v-model="sendAddress"></mt-field>
    <div class="def-wrap">
      <div class="left">设为默认</div>
      <div class="right"><mt-switch v-model="ifDefault"></mt-switch></div>
    </div>
    <el-button v-if="!did" class="save" @click="submit" :class="['theme_' + $store.state.styleColor]">添加地址</el-button>
    <el-button v-if="did" class="save" @click="submit" :class="['theme_' + $store.state.styleColor]">修改地址</el-button>
  </div>
</template>

<script>
import { addVendorClientAddrss,updateVendorClientAddrss } from '@/api'
import { MessageBox, Toast } from 'mint-ui';
export default {
  data() {
    return {
      did: null,
      contacts: '',
      phone: '',
      address: '',
      ifDefault: false,
      sendAddress: '',
      pid: null,
      confirm: 0
    };
  },
  mounted(){
      this.did = this.$route.query.did;
      this.contacts = this.$route.query.contacts;
      this.phone = this.$route.query.phone;
      this.ifDefault = this.did ? (this.$route.query.ifDefault == "false" ? false : true) : false;
      this.sendAddress = this.$route.query.sendAddress;
      this.confirm = this.$route.query.confirm;
      this.pid = this.$route.query.pid;
  },
  methods: {
    submit() {
      let phonerule = /^1[3-9]\d{9}$/;
      if(!this.contacts){
        Toast({
          message: '请填写联系人再提交',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      if(!this.phone){
        Toast({
          message: '请填写手机号再提交',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      if(!phonerule.test(this.phone)){
        Toast({
          message: '请填正确格式的手机号',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      if(!this.sendAddress){
        Toast({
          message: '请填写详细地址再提交',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      this.loading.open('加载中...')
      if(this.did){
        updateVendorClientAddrss({
          did: this.did,
          sendAddress: this.sendAddress,
          contacts: this.contacts,
          phone: this.phone,
          ifDefault: this.ifDefault
        }).then(res => {
          Toast({
            message: '修改成功',
            position: 'middle',
            duration: 1000
          });
          this.loading.close();
          this.$router.push({
            path:"/address",
            query: {
              confirm: this.confirm,
              pid: this.pid
            }
          });
        })
      }else{
        addVendorClientAddrss({
          sendAddress: this.sendAddress,
          contacts: this.contacts,
          phone: this.phone,
          ifDefault: this.ifDefault
        }).then(res => {
          console.log(res)
          Toast({
            message: '提交成功',
            position: 'middle',
            duration: 1000
          });
          this.loading.close();
          this.$router.push({
            path:"/address",
            query: {
              confirm: this.confirm,
              pid: this.pid
            }
          });
        })
      }

    },
  }
};
</script>

<style lang="scss">
@import '@/common/scss/mixin.scss';
.add-wrap {
  .save {
    font-size: 32px;
    color: #000;
    margin-top: 100px;
    width: 80%;
  }
  .mint-field .mint-cell-title {
    text-align: left;
  }
  .mint-cell {
     padding: 0 20px;
  }
  .mint-cell-wrapper{
    padding: 0;
  }
  .def-wrap {
    background-color: #fff;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    padding: 20px;
    line-height: 2em;
  }
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #fec400;
  background-color: #fec400;
}
</style>
