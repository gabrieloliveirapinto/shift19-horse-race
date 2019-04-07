<template lang="html">
  <div class="">
    <!-- <div class="" v-for="player in players" :key="player['.key']">
      {{player.username}} --- {{player.score}}
    </div> -->
    <div class="" v-if="!this.getReady">
      <div class="">
        <h3>Question</h3>
        <p v-html="question"></p>
      </div>
      <h3>Answers</h3>
      <div class="" v-for="answer in answers">
        <p class="" @click="select(answer)" v-html="answer"></p>
      </div>
    </div>
    <div class="" v-else>
      <h1>Get Ready</h1>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return {
      getReadyTimer: null,
      questionTimer: null,
      correctAnswerTimer: null,
      questionNumber: 0,
      getReady: true
    }
  },
  computed: {
    ...mapState('users', {
      user: 'current',
      user_key: 'currentKey',
      game_key: 'myGameKey',
    }),
    ...mapState('game', {
      question: 'currentQuestion',
      answers: 'currentAnswers',
      total: 'totalQuestions',
      correct: 'correct'
    })
  },
  created(){
    this.init()
    this.getReadyTimer = setInterval(() => {
      console.log("Setting question...")
      this.setQuestion({number: this.questionNumber})
      this.showCorrectAnswer({number: this.questionNumber})
      this.questionNumber++
      this.getReady = false
    }, 5000)
  },
  watch: {
    question: function(newQuestion){
      console.log("Hello:" + newQuestion)
      if(newQuestion === ''){
        console.log(`question number: ${this.questionNumber} and total: ${this.total}`)
        if(this.questionNumber >= this.total){
          clearInterval(this.getReadyTimer)
          clearInterval(this.questionTimer)
          console.log("show leaderboard")
        }else{
          console.log("blank")
          this.getReady = true
          this.getReadyTimer = setInterval(() => {
            this.setQuestion({number: this.questionNumber})
            this.showCorrectAnswer({number: this.questionNumber})
            //update horses
            this.questionNumber++
          }, 5000)
        }
      }else {
        console.log("Not blank")
        this.getReady = false
        clearInterval(this.getReadyTimer)
        this.questionTimer = setInterval(() => {
          console.log("I'm here again")
          clearInterval(this.questionTimer)
          this.clearQuestion()
        },15000)
      }
    },

  },
  methods: {
    ...mapActions('users', ['setUserAnswer', 'updateUserScore']),
    ...mapActions('game', ['getGame', 'setQuestion', 'clearQuestion', 'showCorrectAnswer']),
    init(){
      this.getGame({key: this.$route.params.key})
    },
    select(answer){
      console.log(`This is my ansewr: ${answer}`)
      clearInterval(this.questionTimer)
      this.setUserAnswer({key: this.game_key, user_id: this.user_key, answer: answer})
      if(this.user.answer == this.correct){
        console.log("Correct answer")
        updateUserScore({amount: 10})
      }
      else{
        console.log("Wrong aswer")
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.getReadyTimer)
    clearInterval(this.questionTimer)
  }
}
</script>
