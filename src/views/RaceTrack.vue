<template lang="html">
  <div class="">
    <h1>Welcome to the race!!!</h1>
    <div class="" v-for="player in players" :key="player['.key']">
      {{player.username}} --- {{player.score}}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('players', ['players'])
  },
  created(){
    this.init()
  },
  methods: {
    ...mapActions('players', ['getPlayers']),
    ...mapActions('game', ['getQuestions']),
    init(){
      this.getPlayers()
      this.getQuestions({ammout: 10})
    }
  }
}
</script>
