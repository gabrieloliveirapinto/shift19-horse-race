import { db } from '../firebase'

export default {
  namespaced: true,
  state: {
    horses: null,
  },
  mutations: {
    setHorses(state, payload){
      state.horses = payload
    },
  },
  actions: {
    getHorses({commit}) {
      db.ref('horses').once("value").then(snap => {
        commit('setHorses', snap.val())
      })
    }
  }
}
