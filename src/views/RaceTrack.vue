<template lang="html">
  <div class="tracks">
    <div class="track">
      <img src="./assets/img/horse.gif" alt="horse">
    </div>
    <div class="track">
      <img src="./assets/img/dog.gif" alt="dog">
    </div>
    <div class="track">
      <img src="./assets/img/sonic.gif" alt="sonic">
    </div>
    <div class="track">
      <img src="./assets/img/nyan.gif" alt="nyan cat">
    </div>
  </div>
  <div class="quizz">
    <!-- <div class="" v-for="player in players" :key="player['.key']">
      {{player.username}} --- {{player.score}}
    </div> -->
    {{questions}}
    <div class="" v-if="!this.getReady">
      <div class="">
        <h3>Question</h3>
        <p class="question" v-html="currentQuestion"></p>
      </div>
      <h3>Answers</h3>
      <div class="answers" v-for="answer in currentAnswers">
        <p class="answer" @click="select(answer)" v-html="answer"></p>
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
<style lang="css" scoped>
html {
  height: 100vh;
  background-image: url(../img/grass.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
  font-family: 'Press Start 2P', cursive;
}

* {
  margin: 0;
}

.tracks {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.track {
  background-image: url(../img/dirt.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 4rem;
  margin-top: 5rem;
}

.track:first-child > img, .track:nth-child(4) > img  {
  width: 7rem;
  height: auto;
}

.track img {
  width: 4rem;
  height: auto;
}

.quizz {
  position: fixed;
  width: 100vw;
  height: 25vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255,255,255,0.5);
}

.question {
  text-align: center;
  margin-bottom: 2rem;
}
.answers {
  display: flex;
  justify-content: space-around;
}

.answer button {
  width: 15rem;
  padding: 1rem;
  border: none;
  border-radius: .5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  background-size: cover;
  cursor: pointer;
}

.answer button:hover {
  color: white;
}

.answer:first-child > button{
  background-image: url(../img/red.png);
}

.answer:nth-child(2) > button{
  background-image: url(../img/blue.jpg);
}

.answer:nth-child(3) > button {
  background-image: url(../img/yellow.jpg);
}

.answer:nth-child(4) > button {
  background-image: url(../img/green.png);
}
</style>
