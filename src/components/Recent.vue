<template>
<div class="main">
  <div class="diary">
    <Table @on-row-click="handel" ref="selection" border :columns="columns" :data="data"></Table>
    <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name:'Recent',
  data(){
    return{
      entities: [],
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
              columns: [
                   {
                        title: '日期',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: '文章类型',
                        key: 'type'
                    },
                    {
                        title: '文章简介',
                        key: 'simpleC',
                        sortable: true
                    },
                    {
                        title: '作者',
                        key: 'author'
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
handlePage(value) {
      this.pageNum = value
      // this.getTeacherMessages()
    },
    handlePageSize(value) {
      this.pageSize = value
      // this.getTeacherMessages()
    },
  },
  mounted:function(){
      console.log(111)
      // 进行网络访问，渲染类别列表
      let that = this;
      var username = localStorage.getItem('username');
      console.log(username)
      axios.post(this.$store.state.url + '/findDynamic',{username:username}).then(function(res){
        console.log(res)
        if(res.data.code == '1'){
          if(res.data.message[0]){
            console.log(99)
          }
          else{
              alert('暂无数据')
          }
          for (let i = 0; i < res.data.message.length; i++) {
            that.data.push({data: '',type:'',author:'',simpleC: ''});
            that.data[i].type = res.data.message[i].type;
            that.data[i].simpleC = (res.data.message[i].simpleC).substring(0,15);
            that.data[i].author = res.data.message[i].author;
            that.data[i].date = res.data.message[i].data;
            // that.entities.push(entity);
          }

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
.ivu-page{
  position: relative;
  /* margin: 450px 0 0 350px */
  bottom: -500px;
  margin-left: 75%;
}
</style>

