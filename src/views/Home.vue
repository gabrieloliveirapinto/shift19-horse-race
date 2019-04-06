<template>
  <div class="home">
    <h1>Welcome to Peaky Blinders Grand Prix</h1>
    <div class="" v-if=" this.totalPlayers < 4">
      <input type="text" name="username" v-model="username" placeholder="Insert username">
      <button @click="joinRace()">Join Race</button>
    </div>
    <div class="" v-else>
      Race is full...
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data(){
    return {
      username: '',
    }
  },
  computed: {
    ...mapState('players', ['players', 'totalPlayers']),
    ...mapState('horses', ['horses']),
  },
  created(){
    this.init()
  },
  methods: {
    ...mapActions('players', ['getPlayers','setUser']),
    ...mapActions('horses', ['getHorses']),
    init(){
      this.getPlayers()
      this.getHorses()
    },
    joinRace(){
      let randomIndex =  0
      let horseNames = ['horse1', 'horse2', 'horse3', 'horse4']
      while(this.horses[horseNames[randomIndex]].selected && randomIndex < 4){
        randomIndex = randomIndex + 1
      }
      this.setUser({
        horse: horseNames[randomIndex],
        username: this.username
      })
    }
  }
}
</script>
