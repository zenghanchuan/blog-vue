<template>
  <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><img src="../assets/he.jpg" alt=""></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" @on-select="change" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                个人中心
                            </template>
                            <MenuItem name="userinfo">基本信息</MenuItem>
                            <MenuItem name="recent">近期动态</MenuItem>
                            <MenuItem name="setup">信息修改</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                文章管理
                            </template>
                            <MenuItem name="release">文章发布</MenuItem>
                            <MenuItem name="see">文章查看</MenuItem>
                            <MenuItem name="modify">文章修改</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                评论管理
                            </template>
                            <MenuItem name="comment">评论查看</MenuItem>
                            <MenuItem name="commentReply">评论回复</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>{{msg}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <!-- <UserInfo/> -->
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import UserInfo from '../components/UserInfo';
export default {
  name:'home',
  components:{
    UserInfo
  },
  data(){
    return{
      msg:'',
    }
  },
  methods:{
    change:function(e){
      var that = this;
      console.log(e)
      if(e){
        that.$router.push({path: '/home/' + e})
        that.msg = e
      }
    }
  }
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-logo>img{
  width: 100%;
  height: 100%;
  margin: -20px 0 0 0px;
  border-radius: 3px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout.ivu-layout-has-sider{
  height: 800px;
}
</style>

