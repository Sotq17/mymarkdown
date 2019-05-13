<template>
<div class="home">
  <h1 class="title">Welcome to</h1>
  <h1 class="title">MyMarkDown</h1>
  <h1 class="title"><img src="../assets/markdown-mark.png" width="100" height="100"></h1>
  <h1 class="description">最小限の機能に絞ったマークダウンエディター</h1>
  <div class="login" @click="googleLogin"><img src="../assets/btn_google.png" width="200" height="50"></div>
  <div class="pic"><img src="../assets/mymarkdown.png" width="1000" height="600"></div>
  <h1 class="text">マークダウン記法で書けて、リアルタイムにプレビュー</h1>
  <h1 class="text">ショートカットキーにより、簡単操作！</h1>
  <h1 class="commands">"Control + s"(Macの場合は"Command + s")ですぐに保存</h1>

  <h1><img alt="MyMarkdown" src="../assets/logo.png" width="50" height="50"></h1>
  <router-link :to="{name: 'terms'}">利用規約</router-link>

</div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to MyMarkdown'
    }
  },
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>

<style lang="scss">
.home {
    margin-top: 60px;
}
.title {
  font-family: Nanum Pen Script;
  font-size: 80px;
  color:#228B22;
}
.description{
  padding:30px;
  font-size: 30px;
  font-family: monospace;
}
.text{
  padding-top:30px;
  font-size: 25px;
  font-family: monospace;
}
.commands{
  margin: 20px 400px;
  padding:10px;
  font-size: 15px;
  font-family: monospace;
  background: gray;
  color: white;
}
.login{
  padding-bottom:30px;

  img{
    cursor: pointer;
  }
}
</style>