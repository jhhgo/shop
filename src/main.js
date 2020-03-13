/*
  入口js
 */

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
