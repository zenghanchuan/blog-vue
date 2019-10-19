<template>
  <div>
    <Table border :columns="columns12" :data="data">
        <template slot-scope="{ row }" slot="data">
            <strong>{{ row.data }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'see',
  data () {
            return {
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
                this.$Modal.info({
                    title: '文章详情',
                    content: `日期：${this.data[index].data}<br>标题：${this.data[index].type}<br>作者：${this.data[index].author}<br>文章内容：${this.data[index].simpleC}`
                })
            },
            remove (index) {
              var that = this;
                  var username = localStorage.getItem('username');
                  console.log(this.data[index].type)
                  axios.post(this.$store.state.url + '/findRemove',{type:this.data[index].type,username:username}).then(function(res){
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
          var that = this;
          var username = localStorage.getItem('username');
          axios.post(this.$store.state.url + '/findDynamic',{username:username}).then(function(res){
            console.log(res)
            if(res.data.code == '1'){
              for (let i = 0; i < res.data.message.length; i++) {
                that.data.push({data: '',type:'',author:'',simpleC: ''});
                that.data[i].data = res.data.message[i].data;
                that.data[i].author = res.data.message[i].author;
                that.data[i].simpleC = res.data.message[i].simpleC;
                that.data[i].type = res.data.message[i].type;
          }
            }
          }).catch(function(error){
            console.log(error)
          })
        }
}
</script>

