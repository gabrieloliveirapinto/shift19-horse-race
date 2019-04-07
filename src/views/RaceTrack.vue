<template lang="html">
  <div class="">
    <!-- <div class="" v-for="player in players" :key="player['.key']">
      {{player.username}} --- {{player.score}}
    </div> -->
    {{questions}}
    <div class="" v-if="!this.getReady">
      <div class="">
        <h3>Question</h3>
        <p v-html="currentQuestion"></p>
      </div>
      <h3>Answers</h3>
      <div class="" v-for="answer in currentAnswers">
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
    ...mapState('game', ['questions', 'answers', 'currentQuestion', 'currentAnswers'])
  },
  created(){
    this.init()
    // this.getReadytimer = setInterval(() => {
    //   console.log("Setting question...")
    //   this.setQuestion({number: this.questionNumber})
    //   this.questionNumber++
    //   this.getReady = false
    // }, 5000)
  },
  // watch: {
  //   question: function(newQuestion){
  //     console.log("Helllo")
  //     clearInterval(this.getReadyTimer)
  //     this.qustionTimer = setInterval(() => {
  //       this.getReady = false
  //     }, 20000)
  //   }
  // },
  methods: {
    ...mapActions('game', ['getGame', 'setQuestion']),
    init(){
      this.getGame({key: this.$route.params.key})
    },
    select(answer){
      console.log(`This is my ansewr: ${answer}`)
      clearInterval(this.questionTimer)
      // this.setUserAnswer({key: this.$route.params.key, amswer: answer})
    }
  },
  beforeDestroy() {
    clearInterval(this.getReadyTimer)
    clearInterval(this.questionTimer)
  }
}
</script>
