<template>
<div class="main">
  <div class="diary">
    <Table @on-row-click="handel" ref="selection" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="data">
            <strong>{{ row.data }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
  </div>
  <div class="technology">
    <!-- <button @click="handel">sads</button> -->
  </div>
  <div class="null"></div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name:'Comment',
  data(){
    return{
      entities: [],
      id:'',
              columns: [
                   {
                        title: '用户',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: '文章标题',
                        key: 'article'
                    },
                    {
                        title: '评论内容',
                        key: 'content',
                        sortable: true
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
              ],
              data: []
    }
  },
  methods:{
    handel:function(data){
      // this.modal3 = true;
      console.log(data)
      // 获取表格当前行数据
      // this.thecurrentdata = data;
    },
show (index) {
  var that = this;
  that.id = that.data[index].id;
                this.$Modal.info({
                    title: '文章详情',
                    content: `日期：${this.data[index].date}<br>标题：${this.data[index].article}<br>评论内容：${this.data[index].content}<br>评论用户：${this.data[index].name}`
                })
            },
remove (index) {
              var that = this;
                  var username = localStorage.getItem('username');
                  console.log(this.data[index].id)
                  axios.post(this.$store.state.url + '/remvoeComment',{id:that.data[index].id}).then(function(res){
                    console.log(res)
                    if(res.data.code == '1'){
                      that.data.splice(index, 1);
                      that.$Message.success("删除成功");
                    }
                  }).catch(function(error){
                    console.log(error)
                  })
            }
  },
  mounted:function(){
      console.log(111)
      // 进行网络访问，渲染类别列表
      let that = this;
      var username = localStorage.getItem('username');
      console.log(username)
      axios.post(this.$store.state.url + '/findComment',{}).then(function(res){
        console.log(res)
        for (let i = 0; i < res.data.message.length; i++) {
            that.data.push({name: '',article:'',content:'',date: '',id:''});
            that.data[i].name = res.data.message[i].name;
            that.data[i].article = (res.data.message[i].article).substring(0,15);
            that.data[i].content = res.data.message[i].content;
            that.data[i].date = res.data.message[i].data;
            that.data[i].id = res.data.message[i]._id;
            // that.entities.push(entity);
          }
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
</style>

