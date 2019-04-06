import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import router from './router'
import store from './store'
import './firebase'

Vue.use(VueFire)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
