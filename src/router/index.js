import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Regist from '@/views/Regist'
import UserInfo from '@/components/UserInfo'
import Recent from '@/components/Recent'
import SetUp from '@/components/SetUp'
import Release from '@/components/Release'
import See from '@/components/See'
import Modify from '@/components/Modify'
import Comment from '@/components/Comment'
import CommentReply from '@/components/CommentReply'
Vue.use(Router)
// if(Vue.cookie.get('token')) {
//   store.commit('setToken', VueCookie.get('token'));  // 保证页面刷新token仍有效
// }
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Login,
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      component: Home,
      children:[
        {
          path: '/home/userinfo',
          name: 'userinfo',
          component: UserInfo
        },
        {
          path: '/home/recent',
          name: 'Recent',
          component: Recent
        },
        {
          path: '/home/setup',
          name: 'SetUp',
          component: SetUp
        },
        {
          path: '/home/release',
          name: 'Release',
          component: Release
        },
        {
          path: '/home/see',
          name: 'See',
          component: See
        },
        {
          path: '/home/modify',
          name: 'Modify',
          component: Modify
        },
        {
          path: '/home/comment',
          name: 'Comment',
          component: Comment
        },
        {
          path: '/home/commentReply',
          name: 'CommentReply',
          component: CommentReply
        },
      ]
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
  ],

})
