<template>
  <div id="app">
    <Home v-if="!isLogin"></Home>
    <Editor v-if ="isLogin" :user="userData"></Editor>
  </div>
</template>

<script>
import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";


export default {
  name: 'top',
  data () {
    return {
      isLogin:false,
      userData:null
    };
  },
  created: function(){
      firebase.auth().onAuthStateChanged(user =>{
        console.log(user);
        if (user){
        this.isLogin = true;
        this.userData = user;
        }
        else{
          this.isLogin = false;
          rhis.userData = null;
        };
      });
    },
  components:{
    Home: Home,
    Editor: Editor
  }
};
</script>
