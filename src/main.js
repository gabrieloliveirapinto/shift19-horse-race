import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import router from './router'
import store from './store'
import axios from 'axios'
import './firebase'

Vue.use(VueFire)
window.axios = require('axios');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
