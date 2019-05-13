<template>
  <div id="app">
		<div class="loading" v-if="!isLoading"><p>Now Loading...</p>
			<img src="../assets/gif-load.gif" width="100" height="100">
		</div>
    <Home v-if="!isLogin"></Home>
		<!-- ログインしてなければホームを表示 -->
    <Editor v-if ="isLogin" :user="userData"></Editor>
		<!-- ログインしていればエディター画面を表示 -->
  </div>
</template>

<script>
import Home from "../components/Home.vue";
import Editor from "../components/Editor.vue";
// それぞれのコンポーネントの呼び出し

export default {
  name: 'top',
  data () {
    return {
			isLoading:false,
      isLogin:false,
			userData:null
			// 初期データはからにしておく
    };
  },
  created: function(){
      firebase.auth().onAuthStateChanged(user =>{
				console.log(user);
				this.isLoading = true;
        if (user){
        this.isLogin = true;
				this.userData = user;
				// firebaseにuser情報が入っていればisLoginをtrue
        }
        else{
          this.isLogin = false;
					this.userData = null;
					// user情報が入っていなければisLoginをfalse
        };
      });
    },
  components:{
    Home: Home,
    Editor: Editor
  }
};

</script>

<style lang="scss">
.loading {
  font-family: Nanum Pen Script;
  font-size: 80px;
	color:#228B22;
	padding-top: 10px;
}
</style>