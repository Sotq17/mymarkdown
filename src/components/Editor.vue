<template>
	<div class="editor">
		<div class="header">
			<h1>MyMarkdown</h1>
			<div class ="userinfo">
				<div class="logout" @click="logout" >LogOut  <font-awesome-icon icon="sign-out-alt" /></div>
			</div>
		</div>
		<div class="wrapper">
			<div class = "memoListWrapper">
				<div class ="btnbox">
					<div class ="addMemoBtn" @click="addMemo"><font-awesome-icon icon="folder-plus" /></div>
					<div class ="deleteMemoBtn" @click="deleteMemo"><font-awesome-icon icon="trash-alt" /></div>
					<div class ="saveMemoBtn" @click="saveMemo"><font-awesome-icon icon="save" /></div>
				</div>
				<div class= "listbox">
					<div class ="memoList" v-for="(memo,index) in memos" :key="index" @click="selectMemo(index)" :data-selected="index == selectedIndex">
						<div class= "memoTitle">{{displayTitle(memo.markdown)}}</div>
					</div>
				</div>
			</div>
			<textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
			<div class="preview markdown-body" v-html="preview()"></div>
		</div>
	</div>
</template>

<script>
	import marked from "marked";
	export　default　{
		name: "editor",
		props: ["user"],
		data(){
			return{
				memos:[{
						markdown:""
					}],
				selectedIndex: 0
			};
		},
		created: function(){
			firebase.database().ref("memos/" + this.user.uid).once("value").then(result => {
				if (result.val()){
					this.memos = result.val();
				}
			})
		},
		methods:{
			logout:function(){
				firebase.auth().signOut();
			},
			addMemo: function(){
				this.memos.push({
					markdown: "マークダウン記法サンプル\n\n"+

										"【見出し】\n\n"+

										"# 見出し h1\n"+
										"## 見出し h2\n"+
										"### 見出し h3\n"+
										"#### 見出し h4\n"+
										"##### 見出し h5\n"+
										"###### 見出し h6\n\n"+

									"【水平線】\n"+

									"---\n\n"+

									"【チェックボックス】\n"+

									"- [x] Foo\n"+
									"- [ ] Bar\n"+
									"- [ ] Baz\n\n"+

									"【リスト】\n"+

									"- 番号なしリスト\n"+
									"- 番号なしリスト\n"+
									"- 番号なしリスト\n\n"+

									"1. 番号付きリスト\n"+
									"2. 番号付きリスト\n"+
									"1. 番号付きリスト\n\n"+

									"【文体加工】\n\n"+

									"**太字**\n"+

									"*斜体*\n"+

									"~~打ち消し~~\n\n"+

									"【コード表示】\n\n"+

									"`コードのインライン表示`\n\n"+

									"```\n"+
									"<div class = markdown>\n"+
										"<h1>MyMarkDown</h1>\n"+
									"</div>\n"+
									"```\n\n"+

									"【埋め込み】\n\n"+

									"リンク\n"+
									"[MyMarkDown](https://mymarkdown-memo.firebaseapp.com/#/)\n\n"+

									"画像\n"+
									"![alt](http://www.mocchiblog.com/wp-content/images/2014/03/github-logo.jpg)\n\n"+


									"【その他】\n\n"+

									">引用\n"+
									">>さらに引用\n"+
									">>>さらにさらに引用\n\n"+

									"|左寄せ|右寄せ|真ん中|\n"+
									"|---|---:|:---:|\n"+
									"|A|B|C|\n"+
									"|あ|い|う|\n"+
									"|1|2|3|\n"
				})
			},
			selectMemo: function(index){
				this.selectedIndex = index;
			},
			preview: function(){
				return marked(this.memos[this.selectedIndex].markdown);
			},
			displayTitle: function(text){
				return text.split(/\n/)[0];
			},
			deleteMemo: function(){
				this.memos.splice(this.selectedIndex, 1);
				if (this.selectedIndex > 0){
					this.selectedIndex--;
				}
			},
			saveMemo: function(){
				firebase.database().ref("memos/" + this.user.uid).set(this.memos);
			},
		},
		mounted: function(){
			document.onkeydown = e => {
				if (e.key == "s" && (e.metaKey || e.ctrlKey)) {
					this.saveMemo();
					return false;
				}
			}
		},
		beforeDestroy: function(){
			document.onkeydown = null;
		},
	};
</script>

<style lang="scss" scoped>
	.header{
		height:70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ccc;
		h1{
			padding-left:50px;
			font-family: Nanum Pen Script;
			font-size: 50px;
			color:#228B22;
		}
		.userinfo{
			padding-right:50px;
			display: flex;
			.logout{
				padding-left:20px;
				font-size: 20px;
			}
			.logout:hover{
				cursor: pointer;
				color:#228B22
			}
		}
	}

	.wrapper{
		display: flex;
		height: 750px;
		.memoListWrapper{
			width:20%;
			overflow: scroll;
			.btnbox{
				padding: 20px 12px;
				display: flex;
				justify-content: center;
				font-size: 25px;
				.addMemoBtn:hover{
					cursor: pointer;
					color: #228B22;
				}
				.deleteMemoBtn{
					padding: 0 50px;
				}
				.deleteMemoBtn{
					svg:hover{
					cursor: pointer;
					color:#228B22;
					}
				}
				.saveMemoBtn:hover{
					cursor: pointer;
					color:#228B22
				}
				.memoTitle{
					height: 1.5em;
					margin: 0;
					white-space:nowrap;
					overflow: hidden;
				}
			}
			.listbox{
				.memoList{
					cursor: pointer;
					padding: 10px;
					box-sizing: border-box;
					text-align: left;
					overflow: scroll;
					background-color:#FFFAFA;
					&:nth-child(even){
						background-color: #F0FFF0;
					}
					&[data-selected="true"]{
						color: #0000CD;
  					text-decoration : underline;
					}
				}
			}
		}
		.markdown{
			width: 40%;
			border: 0;
			background-color: #f5f5f5;
			border-right: 1px solid #ccc;
			border-left: 1px solid #ccc;
			background-color: #eee;
			box-shadow: inset 0 0 5px 0 rgba(0,0,0,.1);
			padding: 10px;
			overflow: scroll;
		}
		.preview{
			width: 40%;
			text-align: left;
			padding: 10px;
			overflow: scroll;
		}
	}
</style>