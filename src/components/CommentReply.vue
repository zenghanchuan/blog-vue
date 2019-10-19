<template>
<div class="main">
  <div class="diary">
    <Table @on-row-click="handel" ref="selection" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="data">
            <strong>{{ row.data }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">评论</Button>
            <Button type="error" size="small" @click="submit(index)">确定</Button>
            <Modal
              v-model="modal1"
              title="请选择您要修改的内容"
              @on-ok="ok"
              @on-cancel="cancel">
              <!-- <input type="text" v-model="datas" placeholder="发布时间">
              <input type="text" v-model="name" placeholder="文字类型"> -->
              <!-- <input type="text" v-model="simpleC" placeholder="文章内容"> -->
              <textarea name="" id="" cols="30" rows="10" v-model="content" placeholder="文章内容"></textarea>
              <!-- <input type="text" v-model="article" placeholder="作者"> -->
            </Modal>
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
  name:'CommentReply',
  data(){
    return{
      entities: [],
              index:'',
              modal1: false,
              datas:'',
              name:'',
              article:'',
              content:'',
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
                        key: 'data'
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
              that.modal1 = true;
              that.index = index;
              that.datas = that.data[index].data;
              // that.article = that.data[index].article;
              that.content = that.data[index].content;
              // that.name = that.data[index].name;
              that.id = that.data[index].id;
            },
    ok () {
                var that = this,index = that.index;
                that.modal1 = false;
                that.data[index].data = that.datas;
                // that.data[index].article = that.article;
                that.data[index].content = that.content;
                // that.data[index].name = that.name;
                // that.data[index].id = that.id;
                this.$Message.info('Clicked ok');
                 },
    cancel () {
              this.modal1 = false;
                this.$Message.info('Clicked cancel');
                  },
    submit (index) {
              var that = this,index = that.index,count = 0;
              count++
              console.log(that.data[index].name)
              var names = '游客'  + count;
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
              axios.post(this.$store.state.url + '/saveComment',{data:currentdate,name:names,article:that.data[index].article,content:that.data[index].content}).then(function(res){
                console.log(res)
                if(res.data.code == '1'){
                  that.$Message.success("评论成功");
                }
                else if(res.data.code == '2'){
                  that.$Message.warning("错误");
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
            that.data.push({name: '',article:'',content:'',data: ''});
            that.data[i].name = res.data.message[i].name;
            that.data[i].article = (res.data.message[i].article).substring(0,15);
            that.data[i].content = res.data.message[i].content;
            that.data[i].data = res.data.message[i].data;
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
.ivu-modal-body>textarea{
  width: 80%;
  margin: 2% 0 0 10%;
}
</style>

