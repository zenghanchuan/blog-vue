<template>
  <div>
    <div class="diary">
    <Table ref="selection" v-for="(item) in entities" :columns="item.columns" :data="item.data" border :key='item.id'>
      <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1 = true">添加</Button>
            <Button type="error" size="small" @click="save(index)">发布</Button>
            <Modal
              v-model="modal1"
              title="请选择您要修改的内容"
              @on-ok="ok"
              @on-cancel="cancel">
              <input type="text" v-model="data" placeholder="发布时间">
              <input type="text" v-model="type" placeholder="文字类型">
              <!-- <input type="text" v-model="simpleC" placeholder="文章内容"> -->
              <textarea name="" id="" cols="30" rows="10" v-model="simpleC" placeholder="文章内容"></textarea>
              <input type="text" v-model="author" placeholder="作者">
            </Modal>
        </template>
    </Table>
  </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'release',
  data(){
    return{
      entities: [],
      modal1: false,
      data:'',
      type:'',
      simpleC:'',
      author:'',
    }
  },
  methods:{
    handel:function(data){
      // this.modal3 = true;
      console.log(data)
      // 获取表格当前行数据
      // this.thecurrentdata = data;
    },
    save:function(){
      var that = this;
      var username = localStorage.getItem('username');
      // var password = localStorage.getItem('password');
      axios.post(this.$store.state.url + '/saveRecords',{username:username,data:this.data,type:this.type,simpleC:this.simpleC,author:this.author}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
          that.$Message.success("发布成功");
          // window.location.reload()
        }
      }).catch(function(error){
        console.log(error)
      })
      // window.location.reload()
    },
    ok () {
      var that = this;
      that.entities[0].data[0].type = that.type;
      that.entities[0].data[0].data = that.data;
      that.entities[0].data[0].simpleC = that.simpleC;
      that.entities[0].data[0].author = that.author;
      this.$Message.info('Clicked ok');
          },
    cancel () {
      this.$Message.info('Clicked cancel');
        },
  },
  mounted:function(){
      console.log(111)
      // 进行网络访问，渲染类别列表
      let that = this;
      var username = localStorage.getItem('username');
      var entity = {
              id: -1,
              columns: [
                   {
                        title: '日期',
                        key: 'data',
                        width: 150,
                        sortable: true
                    },
                    {
                        title: '文章类型',
                        width: 150,
                        key: 'type'
                    },
                    {
                        title: '文章内容',
                        width: 950,
                        key: 'simpleC',
                        sortable: true
                    },
                    {
                        title: '作者',
                        key: 'author'
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
                    data: '',
                    type: '',
                    simpleC: '',
                    author: '',
                },
              ]
            };
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
  // console.log(currentdate);
            that.data = currentdate;
            entity.data[0].data = currentdate;
            entity.data[0].type = that.type;
            entity.data[0].simpleC = that.simpleC;
            entity.data[0].author = that.author;
            that.entities.push(entity);
    }
}
</script>
<style scoped>

.ivu-table-cell{
  width: 200px;
}
.ivu-modal-body>input{
  width: 80%;
  margin: 2% 0 0 10%;
  height: 30px;
}
.ivu-modal-body>textarea{
  width: 80%;
  margin: 2% 0 0 10%;
}
</style>


