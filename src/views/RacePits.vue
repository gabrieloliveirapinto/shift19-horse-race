<template lang="html">
  <div class="content">
    <h1>Welcome to the race</h1>
    <h2>Num of Players: {{this.totalPlayers}}</h2>
    <!-- <div class="" v-for="player in game.players" :key="player['.key']">
      {{player.user_id}}
    </div> -->
    <div class="" v-if="user && user.ready">
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
    ...mapState('users', {
      user: 'current',
      user_key: 'currentKey',
      game_key: 'myGameKey',
      totalPlayersReady: 'totalPlayersReady'
    }),
    ...mapState('game', {
      game: 'current',
      totalPlayers: 'totalPlayers'
    })
  },
  created(){
    this.init()
  },
  watch:{
    totalPlayersReady: function(newTotal){
      console.log('total ready: ' + newTotal)
      if(newTotal === this.totalPlayers){
        this.startGame({
          key: this.game_key,
          amount: this.game.amount,
          level: this.game.level
        })()
      }
    }
  },
  methods: {
    ...mapActions('users', ['getLoggedUser','setUserReady', 'checkPlayersReady']),
    ...mapActions('game', ['getGame', 'checkTotalPlayers', 'startGame']),
    init(){
      this.getLoggedUser({key: this.$route.params.key, user_id: this.$route.params.user})
      this.getGame({key: this.$route.params.key})
      this.timer = setInterval(() => {
        console.log("Checking all ready")
        this.checkTotalPlayers({key: this.$route.params.key})
        this.checkPlayersReady({key: this.$route.params.key})
      }, 5000)
    },
    playerReady(){
      this.setUserReady({
        key: this.user_key
      })
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
