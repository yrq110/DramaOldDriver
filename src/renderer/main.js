import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import RizuUI from 'rizu-ui'
import 'rizu-ui/dist/styles/rizuui.css'
Vue.use(RizuUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
// Vue.http.options.emulateJSON = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
