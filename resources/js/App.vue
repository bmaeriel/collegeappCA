<template>
  <div>
    <navbar :app="this" :isLoggedIn="isLoggedIn" @login="login()" @logout="logout()"></navbar>

    <router-view :isLoggedIn="isLoggedIn" @login="login()" @logout="logout()"> </router-view>
  </div>
</template>
<script>
import navbar from './components/navbar'

export default{
  name: 'app',
  props: [],
  components: {
    navbar
  },
  data(){
    return{
      isLoggedIn: false
    }
  },
  created(){
    this.checkIfLoggedIn();
  },
  methods:{
    checkIfLoggedIn(){
      let token = localStorage.getItem("token");
      console.log("Check if log in");
      if(token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    login(){
      this.isLoggedIn = true;
    },
    logout(){
      this.isLoggedIn = false;
    }

  }
}
</script>
<style>
</style>
