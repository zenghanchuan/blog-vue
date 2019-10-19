// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(iView)
   .use(VueAxios, axios);
router.beforeEach((to,from,next) =>{
  var that = this;
  if(to.meta.requireAuth){
    if(store.state.token == true){
      next();
    }
    else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }
  else{
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
