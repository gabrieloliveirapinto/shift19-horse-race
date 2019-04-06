<template lang="html">
  <div class="content">
    <h1>Welcome to the Grand Prix {{this.current.username}}</h1>
    <div class="" v-for="player in players" :key="player['.key']">
      {{player.username}} -- {{player.ready}}
    </div>
    <div class="" v-if="this.current.ready">
      User Ready!
    </div>
    <h2>Are u ready?</h2>
    <button @click="playerReady()">Ready</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return {
      totalReady: 0,
      timer: null
    }
  },
  computed: {
    ...mapState('players', ['current', 'currentKey', 'players', 'totalPlayersReady', 'totalPlayers']),
  },
  created(){
    this.init()
    this.timer = setInterval(() => {
      console.log("Checking all ready")
      this.checkPlayersReady()
    }, 5000)
  },
  watch:{
    totalPlayersReady: function(newTotal){
      console.log('total ready: ' + newTotal)
      if(newTotal === this.totalPlayers){
        this.startGame()
      }
    }
  },
  methods: {
    ...mapActions('players', ['getLoggedPlayer','setUserReady', 'getPlayers', 'checkPlayersReady', 'startGame']),
    init(){
      this.getLoggedPlayer({key: this.$route.params.key})
      this.getPlayers()

    },
    playerReady(){
      this.setUserReady({
        key: this.currentKey
      })
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
