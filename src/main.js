import "shitajicss/docs/css/shitaji.min.css";
import "./scss/style.scss";
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import markdownIt from "markdown-it";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

export default {
  data() {
    md: new markdownIt({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
        },
        html: true,
        linkify: true,
        breaks: true,
        typographer: true
    })
    .use(katex, { throwOnError: false, errorColor: " #cc0000" })
    .use(emoji)
    .use(checkbox)
    .use(sanitizer)
    .use(resizeImg, { autofill: true })
    .use(sub)
    .use(ins)
    .use(mark)
    .use(footnote)
    .use(deflist)
    .use(abbr)
    .use(container, "info")
    .use(container, "success")
    .use(container, "warning")
    .use(container, "danger");

    return {
      markdownIt: md,
      sourceText: String
    }
  },
  computed: {
    compileMarkdown: function() {
      return this.markdownIt.render(this.sourceText);
    }
  }
}