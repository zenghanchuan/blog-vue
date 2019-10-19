import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
 state: {
  message: '我是阿格斯之盾',
  url:'http://118.24.116.33:8030',
  token:false
 },
 mutations: {
  MESSAGE_INFO (state,view) {
  state.message = view;
 },
  settoken(state, payload){
      if(payload.hasOwnProperty('token')){
          state.token = payload.token
      }
  }
 }
})
export default store
