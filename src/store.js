import Vue from 'vue'
import Vuex from 'vuex'
import players from './store/players.js'
import horses from './store/horses.js'
import game from './store/game.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    players,
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
