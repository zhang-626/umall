// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import "./assets/css/reset.css"
import "./assets/js/rem.js"


// 1引入componted里的全局组件index。js
import "./components/index"


// 2引入全局过滤器
import "./filters/index"

// 3引入vuex
import store from './store/index.js'

// 4引入ui库
import ElementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUi)

// // 文件上传的开发环境
// let baseUrl = '/api',
Vue.prototype.$imgUrl = "http://localhost:3000/"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//3
  components: { App },
  template: '<App/>'
})
