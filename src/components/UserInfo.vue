<template>
  <div class="userinfo">
    <div class="portrait">
      <img src="../assets/he.jpg" alt="">
    </div>
    <div class="info" v-for="item in info" :key="item.name">
      <ul>
        <li>{{ item.name }}</li>
        <li>{{ item.sex }}</li>
        <li>{{ item.job }}</li>
        <li>{{ item.hobby }}</li>
        <li>{{ item.constellation }}</li>
        <li>{{ item.email }}</li>
      </ul>
    </div>
    <div class="myself">{{message}}</div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'userinfo',
  data(){
    return{
      info:[
        {
        name:'曾小韩',
        sex:'boy',
        job:'程序员',
        hobby:'睡觉',
        constellation:'贵族',
        email:'123123',
        }
      ],
      message:'个人宣言：不该在奋斗的年级而选择了安逸！'
    }
  },
  mounted:function(){
    let that = this;
      var username = localStorage.getItem('username');
      axios.post(this.$store.state.url + '/findUsers',{username:username}).then(function(res){
        console.log(res)
        that.info[0].name = res.data.message.name;
        that.info[0].sex = res.data.message.sex;
        that.info[0].job = res.data.message.job;
        that.info[0].hobby = res.data.message.hobby;
        that.info[0].constellation = res.data.message.constellation;
        that.info[0].email = res.data.message.email;
        console.log(that.name)
      }).catch(function(error){
        console.log(error)
      })
  }
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.userinfo{
  position: relative;
}
.portrait{
  max-width: 25%;
  min-width: 20%;
  max-height: 450px;
  min-height: 300px;
  /* border: 1px solid #999999; */
  margin: 5% 0 0 5%;
  display: block;
}
.portrait img{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
.info{
  width: 70%;
  max-height: 450px;
  min-height: 350px;
  display: block;
  float: left;
  margin: -20% 0 0 50%;
  font-size: 24px;
  font-weight: bold;
}
li{
  list-style:georgian;
  width: 90%;
  height: 60px;
}
.myself{
  display: block;
  font-size: 16px;
  margin: 5% 0 0 5%;
  line-height: 70%;
  font-weight: bold;
}

</style>

