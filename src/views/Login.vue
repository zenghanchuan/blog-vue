<template>
    <div class="main">
      <img src="../assets/banner005.jpg" alt="">
      <div class="login">
        <input type="text" v-model="username" name="" value="" id="username" maxlength="11" placeholder="请输入账号">
        <input type="password" v-model="password" name="" value="" id="password" maxlength="8" placeholder="请输入密码">
        <Checkbox v-model="single" @on-change="remember">记住密码</Checkbox>
        <button id="submit" @click="login">登录</button>
        <button id="regist" @click="rigist">前往注册</button>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'login',
    data(){
       return{
           username:'',
           password:'',
           single: false
       }
    },
    methods:{
        login(){
      console.log(this.username)
      console.log(this.password)
      var that = this;
      if(this.username == '' || this.password == ''){
            this.$Message.warning('请输入完整信息');
            return;
          }
      axios.post(this.$store.state.url+'/findUsers', {username: this.username}).then(function (res) {
        console.log(res);
      if(res.data.code == 1){
         if(that.username == res.data.message.username && that.password == res.data.message.password){
            if(that.single == false){
              // that.username = '';
              // that.password = '';
            }
            else if(that.single == true){
              console.log('记住密码')
            }
            localStorage.setItem("password", that.password);
            localStorage.setItem("username", that.username);
            that.$store.commit('settoken',{token: true})
            that.$router.push({path:'/home'})
          }
          else if(that.password != res.data.message.password){
            that.$Message.warning('您输入的密码不正确');
            return;
          }
          }
          else if(res.data.code == 2){
            // that.$Message.warning('您的账号未注册，请前往注册');
            return;
            that.$Modal.confirm({
                    title: '提示',
                    content: '您的账号未注册，是否前往注册',
                    onOk: () => {
                        that.$router.push({path:'./regist'})
                    },
                    onCancel: () => {
                        that.$Message.info('Clicked cancel');
                    }
                });
          }
          else if(res.data.code == 3){
            that.$Message.warning('数据异常，多条相同数据');
          }
      }).catch(function (error) {
        console.log(error);
      });
        },
        rigist(){
           this.$router.push({path:'./regist'})
        },
        remember(){
          console.log(this.single)
        }
    }
}
// new vue({

// })
</script>
<style>
    *{
      margin: 0;
      padding: 0;
    }
    .main{
      width: 100%;
      height: 100%;
      position: relative;
      border: 1px solid #fff;
    }
    .main>img{
      width: 100%;
      height: 90%;
    }
    .login{
        width: 600px;
        height: 500px;
        position: relative;
        border: 3px solid #9999;
        /* margin: 10% 60%; */
        margin: -40% 0 2.5% 65%;
        background: #9999;
    }
    .login input{
        width: 60%;
        height: 40px;
        outline: none;
        background: #e0e0e0;
        position: relative;
        margin: 5% 20%;
        border: none;
        font-size: 16px;
        padding: 0 0 0 10px;
    }
    #username{
        position: relative;
        margin-top: 15%;
    }
    #submit{
        width: 60%;
        height: 40px;
        outline: none;
        background: #00abfd;
        position: relative;
        margin: 5% 20%;
        border: none;
        font-size: 16px;
        border-radius: 20px;
        text-align: center;
    }
    #regist{
        width: 60%;
        height: 40px;
        outline: none;
        background: #00abfd;
        position: relative;
        margin: 0% 20%;
        border: none;
        font-size: 16px;
        border-radius: 20px;
        text-align: center;
    }
    .ivu-checkbox-wrapper .ivu-checkbox-inner{
      left: 80px;
      float: right;
      top:13px;
    }
    .ivu-checkbox-wrapper{
      position: relative;
      top: 0;
      right: -380px;
    }
</style>

