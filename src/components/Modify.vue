<template>
  <div>
    <Table border :columns="columns12" :data="data" @on-row-click="modify">
        <template slot-scope="{ row }" slot="data">
            <strong>{{ row.data }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
            <Button type="error" size="small" @click="submit(index)">确定</Button>
            <Modal
              v-model="modal1"
              title="请选择您要修改的内容"
              @on-ok="ok"
              @on-cancel="cancel">
              <input type="text" v-model="datas" placeholder="发布时间">
              <input type="text" v-model="type" placeholder="文字类型">
              <!-- <input type="text" v-model="simpleC" placeholder="文章内容"> -->
              <textarea name="" id="" cols="30" rows="10" v-model="simpleC" placeholder="文章内容"></textarea>
              <input type="text" v-model="author" placeholder="作者">
            </Modal>
        </template>
    </Table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'modify',
  data () {
            return {
              index:'',
              modal1: false,
              datas:'',
              type:'',
              simpleC:'',
              author:'',
              id:'',
                columns12: [
                    {
                        title: '日期',
                        width: 150,
                        slot: 'data',
                    },
                    {
                        title: '文章标题',
                        width: 150,
                        key: 'type'
                    },
                    {
                        title: '作者',
                        width: 150,
                        key: 'author'
                    },
                    {
                        title: '文字内容',
                        key: 'simpleC'
                    },
                    {
                        title: '文章序号',
                        key: 'id'
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
        methods: {
            show (index) {
              var that = this;
              that.modal1 = true;
              that.index = index;
              that.datas = that.data[index].data;
              that.type = that.data[index].type;
              that.simpleC = that.data[index].simpleC;
              that.author = that.data[index].author;
              that.id = that.data[index].id;
            },
            ok () {
                var that = this,index = that.index;
                that.modal1 = false;
                that.data[index].data = that.datas;
                that.data[index].type = that.type;
                that.data[index].simpleC = that.simpleC;
                that.data[index].author = that.author;
                // that.data[index].id = that.id;
                this.$Message.info('Clicked ok');
                 },
            cancel () {
              this.modal1 = false;
                this.$Message.info('Clicked cancel');
                  },
            modify:function(data){
              console.log(data)
            },
            submit (index) {
              var that = this,index = that.index;
              var username = localStorage.getItem('username');
              console.log(that.data[index].id)
              axios.post(this.$store.state.url + '/updataRecords',{id:that.id,username:username,data:that.data[index].data,type:that.data[index].type,simpleC:that.data[index].simpleC,author:that.data[index].author}).then(function(res){
                console.log(res)
                if(res.data.code == '1'){
                  that.$Message.success("修改成功");
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
          var that = this;
          var username = localStorage.getItem('username');
          axios.post(this.$store.state.url + '/findDynamic',{username:username}).then(function(res){
            if(res.data.code == '1'){
              for (let i = 0; i < res.data.message.length; i++) {
                that.data.push({data: '',type:'',author:'',simpleC: '',id:''});
                that.data[i].data = res.data.message[i].data;
                that.data[i].author = res.data.message[i].author;
                that.data[i].simpleC = res.data.message[i].simpleC;
                that.data[i].type = res.data.message[i].type;
                that.data[i].id = res.data.message[i]._id;
          }
            }
          }).catch(function(error){
            console.log(error)
          })
        }
}
</script>
<style scoped>
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

