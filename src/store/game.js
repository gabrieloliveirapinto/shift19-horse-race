import { db } from '../firebase'
import router from '../router.js'

export default {
  namespaced: true,
  state: {

  },
  mutaitons: {

  },
  actions: {
    getQuestions({ commit }, { amount }){
      axios.get(`https://opentdb.com/api.php?amount=${amount}`).then(response => {
        console.log(response.data)
      })
    }
  }
}
