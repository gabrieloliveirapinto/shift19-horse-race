import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/users.js'
import horses from './store/horses.js'
import game from './store/game.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    horses,
    game
  },
  state: {
  },
  mutations: {

  },
  actions: {

  }
})
