<template>
  <div class="main">
    <img src="../assets/banner005.jpg" alt="">
    <div class="login">
    <input type="text" v-model="username" id="username" maxlength="11" placeholder="请输入账号">
    <input type="password" v-model="password" id="password" maxlength="8" placeholder="请输入密码">
    <div class="get_code">
      <input type="text" v-model="Code" id="code" maxlength="6" placeholder="验证码">
      <button type="text" @click="create" id="send" maxlength="6">{{codeMeg}}</button>
    </div>
    <button id="regist" @click="rigist">注册</button>
  </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "regist",
  data() {
    return {
      username: "",
      password: "",
      Code:'',
      codeMeg:'点击生成验证码',
    };
  },
  methods: {
    rigist() {
      var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      var that = this;
      // var username1 = localStorage.getItem('username');
      // var password1 = localStorage.getItem('password');
      axios.post(this.$store.state.url+'/findUsers',{username:this.username,password:this.password}).then(function(res){
        console.log(res)
        if(res.data.code =='2'){
          if(that.username == '' || that.password == ''){
              that.$Message.warning('请填写完整的信息');
              return;
            }
            else if(TEL_REGEXP.test(that.username) && that.Code == that.codeMeg){         //验证码未做判断
              // localStorage.setItem("username", that.username);
              // localStorage.setItem("password", that.password);
              axios.post(that.$store.state.url + '/saveUsers',{username:that.username,password:that.password,name:'',sex:'',job:'',hobby:'',constellation:'',email:''}).then(function(res){
                console.log(res)
                if(res.data.code == '1'){
                  that.$Message.success("恭喜您，注册成功");
                  that.username = "";
                  that.password = "";
                  that.$router.push({path:'/login'})
                }
              }).catch(function(error){
                console.log(error + '注册失败')
              })

            }
            else if(that.Code == '' || that.Code != that.codeMeg){
              that.$Message.warning('验证错误或者为空');
            }
            else{
              that.$Message.warning('手机号码不正确')
            }
        }
        else if(res.data.code == '1'){
          that.$Message.warning('该账号已被注册')
          this.username = "";
          return;
        }
      }).catch(function(error){
        console.log(error)
      })

    },
    create:function(){
      // var that = this;
      let code = '';
      var codeLength = 6;//验证码的长度
      var random = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                  'S','T','U','V','W','X','Y','Z');//随机数
      for(let i = 0; i < codeLength; i++) {
            //循环操作
            let index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
            code += random[index];//根据索引取得随机数加到code上
      }
      console.log(code)
      this.codeMeg = code;//把code值赋给验证码
    }
  }
};
</script>
<style>
* {
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
      height: 100%;
    }
.login {
  width: 600px;
  height: 500px;
  position: relative;
  border: 3px solid #9999;
  /* margin: 10% 60%; */
  margin: -40% 0 2.5% 65%;
  background: #9999;
}
.login input {
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
#code {
  /* margin: -30px 0 0 120px; */
  margin: 0 0 0 20%;
}
#send {
  width: 30%;
  height: 40px;
  text-align: center;
  margin: 0 0 0 -2px;
  border: none;
  font-size: 16px;
  outline: none;
  background: #e0e0e0;
}
.get_code > input {
  width: 30%;
  margin: 0 0 0 0%;
}
#username {
  position: relative;
  margin-top: 15%;
}
#regist {
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
</style>

