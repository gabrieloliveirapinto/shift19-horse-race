import { db } from '../firebase'
import router from '../router.js'

export default {
  namespaced: true,
  state: {
    current: null,
    myGameKey: null,
    currentKey: null,
    totalPlayersReady: 0
  },
  mutations: {
    setCurrent(state, payload){
      state.current = payload
    },
    setCurrentKey(state, payload){
      state.currentKey = payload
    },
    setMyGameKey(state, payload){
      state.myGameKey = payload
    },
    setTotalPlayersReady(state, payload){
      state.totalPlayersReady = payload
    }
  },
  actions: {
    //get logged user
    getLoggedUser({commit}, {key}){
      commit('setCurrentKey', key)
      db.ref('users').child(key).once("value").then(snap => {
        commit('setCurrent', snap.val())
        commit('setMyGameKey', snap.val().game_key)
      })
    },
    //add user to firebase
    setUser({ commit, dispatch }, { username, birth_date }){
      db.ref('users').push({
        username: username,
        birth_date: birth_date,
        game_key: '',
        score: 0,
        answer: '',
        ready: false,
      }).then(response => {
          console.log(`Success entering rece\nWith response ${response.key}`)
          commit('setCurrentKey', response.key)
          dispatch('getLoggedUser', {key: response.key})
      }).catch(error => {
          console.error("Error adding document: ", error)
      })
    },
    //add game to firebase
    //creates new game instance in firebase
    createGame({commit, state, dispatch}, {amount, level}){
      console.log(`Adding game whith level ${level} and amount ${amount} in firebase...`)
      db.ref('games').push({
        userAnswersTotal: 0,
        amount: amount,
        level: level
      }).then((response) => {
        console.log('setting game key')
        commit('setMyGameKey', response.key)
        dispatch('joinGame', {key: response.key, user_id: state.currentKey})
      }).catch(error => {
        console.error(error)
      })
    },
    //join user to game
    //set's user game_key and new game player with user_id
    joinGame({}, { key, user_id }){
      console.log(`Joining game with key: ${key} and my user_id: ${user_id}`)
      db.ref('games').child(key).child('players').push({
        user_id: user_id,
      }).then(() => {
        console.log("User added to race!")
      }).catch(error => {
        console.error(error)
      })
      db.ref('users').child(user_id).update({
        game_key: key
      })
      router.push({name:'race-pits', params:{key: key, user: user_id}})
    },
    //set user ready to play
    setUserReady({dispatch}, {key}){
      console.log(`Setting user with key:${key} ready...`)
      db.ref('users').child(key).update({
        ready: true
      }).then(response => {
        console.log(response)
          console.log('Player is ready')
          dispatch('getLoggedUser', {key: key})
      }).catch(error => {
          console.error(error)
      })
    },
    checkPlayersReady({commit}, {key}){
      console.log("Checking if players are ready")
      db.ref('users').once('value').then(snap => {
        const values = Object.values(snap.val())
        var totalReady = 0;
        for(var i=0; i < values.length; i++){
          if(values[i].game_key == key && values[i].ready){
            totalReady++
          }
        }
        commit('setTotalPlayersReady', totalReady)
      })
    }
  }
}
