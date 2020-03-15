/*
  入口js
 */

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import {
  Button
} from 'mint-ui'
import './mock/mock'
Vue.component(Button.name, Button)

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
