<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Login/> -->
    <router-view/>
  </div>
</template>

<script>
// import Login from './views/Login'
export default {
  name: 'App',
  // components:{
  //   Login
  // }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-image: url(./assets/banner005.jpg); */
  background-size: 100% 110%;
  background-repeat: no-repeat;
}
</style>
