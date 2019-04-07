import { db } from '../firebase'
import router from '../router.js'

export default {
  namespaced: true,
  state: {
    current: null,
    totalPlayers: 0,
    totalQuestions: 0,
    questions: [],
    currentQuestion: '',
    currentAnswers: [],
    userAnswer: '',
    correct: '',
  },
  mutations: {
    setCurrent(state, payload){
      state.current = payload
    },
    setTotalPlayers(state, payload){
      state.totalPlayers = payload
    },
    setQuestions(state, payload){
      state.questions = payload
      state.totalQuestions = payload.length
    },
    setCurrentQuestion(state, payload){
      state.currentQuestion = payload
    },
    clearCurrentQuestion(state){
      state.currentQuestion = ''
    },
    setCurrentAnswers(state, payload){
      state.currentAnswers = payload.sort()
    },
    clearCurrentAnswers(state){
      state.currentAnswers = []
    },
    setCorrect(state, payload){
      state.correct = payload
    },
    setUserAnswer(state, payload){
      state.userAnswer = payload
    }
  },
  actions: {
    getGame({commit}, {key}){
      db.ref('games').child(key).once("value").then(snap => {
        commit('setCurrent', snap.val())
      })
    },
    checkTotalPlayers({commit}, {key}){
      console.log(`Setting total players for game with key ${key}...`)
      db.ref('games').child(key).once("value").then(snap => {
        console.log(snap.val())
        commit('setTotalPlayers', Object.keys(snap.val().players).length)
      })
    },
    startGame({commit}, {key, amount, level}){
      console.log(`Starting Game ${key} with level: ${level} an amount: ${amount}...`)
      axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${level}&type=multiple`).then(response => {
        console.log(`Uptdating game with id ${key} questions...`)
        console.log(response.data)
        commit('setQuestions', response.data.results)
      }).catch(error => {
        console.log(error)
      })
      console.log(`Pushing to route with params key: ${key}`)
      router.push({name: 'race-track', params:{key: key}})
    },
    setQuestion({commit, state}, {number}){
      console.log(`Setting question number ${number}`)
      commit('setCurrentQuestion', state.questions[number].question)
      commit('setCurrentAnswers', [...state.questions[number].incorrect_answers,state.questions[number].correct_answer])
    },
    clearQuestion({commit}){
      commit('clearCurrentQuestion')
      commit('clearCurrentAnswers')
    },
    showCorrectAnswer({commit, state}, {number}){
      console.log('setting correct answer...')
      commit('setCorrect', state.questions[number].correct_answer)
    },
  }
}
