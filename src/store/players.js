import { db } from '../firebase'
import router from '../router.js'

export default {
  namespaced: true,
  state: {
    players: null,
    current: {},
    currentKey: null,
    totalPlayers: 0,
    totalPlayersReady: 0
  },
  mutations: {
    setPlayers(state, payload){
      state.players = payload
    },
    setCurrent(state, payload){
      state.current = payload
    },
    setCurrentKey(state, payload){
      state.currentKey = payload
    },
    setTotalPlayers(state, payload){
      state.totalPlayers = payload
    },
    setTotalPlayersReady(state, payload){
      state.totalPlayersReady = payload
    }
  },
  actions: {
    getPlayers({commit}) {
      db.ref('players').once("value").then(snap => {
        commit('setPlayers', snap.val())
        if(snap.val()){
          commit('setTotalPlayers', Object.keys(snap.val()).length)
        }
      })
    },
    getLoggedPlayer({commit}, {key}){
      commit('setCurrentKey', key)
      db.ref('players').child(key).once("value").then(snap => {
        commit('setCurrent', snap.val())
      })
    },
    setUser({commit}, {horse, username}){
      db.ref('horses').child(horse).update({
        selected: true
      })
      db.ref('players').push({
        username: username,
        horse: horse,
        ready: false,
        score: 0
      }).then(response => {
          console.log(`Success entering rece\nWith response ${response.key}`)
          commit('setCurrentKey', response.key)
          router.push({name: 'race-pits', params:{key: response.key}})
      }).catch(error => {
          console.error("Error adding document: ", error)
      })
    },
    setUserReady({dispatch, commit}, {key}){
      console.log(`UserKEY:${key}`)
      db.ref('players').child(key).update({
        ready: true
      }).then(response => {
        console.log(response)
          console.log('Player ready')
          dispatch('getLoggedPlayer', {key: key})
      }).catch(error => {
          console.error("Error adding document: ", error)
      })
    },
    checkPlayersReady({commit}){
      console.log("Checking Players Ready")
      db.ref('players').once('value').then(snap => {
        const values = Object.values(snap.val())
        var totalReady = 0;
        for(var i=0; i < values.length; i++){
          if(values[i].ready){
            totalReady++
          }
        }
        commit('setTotalPlayersReady', totalReady)
      })
    },
    startGame({state}){
      console.log("Starting Game...")
      router.push({name: 'race-track', params:{key: state.currentKey}})
    }
  }
}
