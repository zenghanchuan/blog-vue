<template>
<div class="main">
  <div class="diary">
    <Table ref="selection" v-for="(item) in entities" :columns="item.columns" :data="item.data" border :key='item.id'>
      <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1 = true">修改</Button>
            <Button type="error" size="small" @click="save(index)">刷新</Button>
            <Modal
              v-model="modal1"
              title="请选择您要修改的内容"
              @on-ok="ok"
              @on-cancel="cancel">
              <input type="text" v-model="name" placeholder="请输入修改后的名妮">
              <input type="text" v-model="sex" placeholder="girl or boy">
              <input type="text" v-model="job" placeholder="请输入你的职业">
              <input type="text" v-model="hobby" placeholder="你的爱好">
              <input type="text" v-model="constellation" placeholder="你的星座">
              <input type="text" v-model="email" placeholder="你的联系方式">
            </Modal>
        </template>
    </Table>
  </div>
  <div class="technology">
    <!-- <button @on-row-click="handel">sads</button> -->
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name:'SetUp',
  data(){
    return{
      entities: [],
      modal1: false,
      name:'',
      sex:'',
      job:'',
      hobby:'',
      constellation:'',
      email:'',
    }
  },
  methods:{
    handel:function(data){
      // this.modal3 = true;
      console.log(data)
      // 获取表格当前行数据
      // this.thecurrentdata = data;
    },
    show:function(){
      console.log(11)
    },
    save:function(){
      window.location.reload()
    },
    ok () {
      var that = this;
      console.log(this.name)
      var username = localStorage.getItem('username');
      var password = localStorage.getItem('password');
      axios.post(this.$store.state.url + '/updataUsers',{username:username,password:password,name:this.name,sex:this.sex,job:this.job,hobby:this.hobby,constellation:this.constellation,email:this.email}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
          that.$Message.success("修改成功");
          window.location.reload()
        }
      }).catch(function(error){
        console.log(error)
      })
      this.$Message.info('Clicked ok');
          },
    cancel () {
      this.$Message.info('Clicked cancel');
        }
  },
  mounted:function(){
      console.log(111)
      // 进行网络访问，渲染类别列表
      let that = this;
      var username = localStorage.getItem('username');
      axios.post(this.$store.state.url + '/findUsers',{username:username}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
            var entity = {
              id: -1,
              columns: [
                   {
                        title: 'Name',
                        key: 'name',
                        width: 150,
                        sortable: true
                    },
                    {
                        title: 'Sex',
                        width: 150,
                        key: 'sex'
                    },
                    {
                        title: 'Job',
                        width: 180,
                        key: 'job',
                        sortable: true
                    },
                    {
                        title: 'Hobby',
                        key: 'hobby'
                    },
                    {
                        title: 'Constellation',
                        key: 'constellation'
                    },
                    {
                        title: 'E-mail',
                        key: 'email'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
              ],
              data: [
                {
                    name: '',
                    sex: '',
                    job: '',
                    hobby: '',
                    constellation:'',
                    email:'',
                },
              ]
            };
            entity.data[0].name = res.data.message.name;
            entity.data[0].sex = res.data.message.sex;
            entity.data[0].job = res.data.message.job;
            entity.data[0].hobby = res.data.message.hobby;
            entity.data[0].constellation = res.data.message.constellation;
            entity.data[0].email = res.data.message.email;
            that.entities.push(entity);
        }
        that.name = res.data.message.name;
        that.sex = res.data.message.sex;
        that.job = res.data.message.job;
        that.hobby = res.data.message.hobby;
        that.constellation = res.data.message.constellation;
        that.email = res.data.message.email;
        console.log(that.name)
      }).catch(function(error){
        console.log(error)
      })
    }
}
</script>
<style scoped>
.main{
  width: 100%;
  height: 100%;
  position: relative;
}
.ivu-table-cell{
  width: 200px;
}
.ivu-modal-body>input{
  width: 80%;
  margin: 2% 0 0 10%;
  height: 30px;
}
</style>

