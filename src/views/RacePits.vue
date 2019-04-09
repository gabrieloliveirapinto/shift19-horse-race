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
      this.getLoggedUser({key: this.$route.params.user})
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

<style lang="css" scoped>
  .all_user {
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    bottom: 0;
    height: 20vh;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .user h3 {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
  }

  .user img {
    width: 3rem;
    height: auto;
    margin-right: -1rem;
    z-index: 100;
  }

  .user:first-child img, .user:nth-child(4) img {
    width: 5rem;
    height: auto;
  }

  .user h3 {
    background: #FF0F00;
  }

  button {
    background: white;
    padding: 2rem;
    border: .5rem solid white;
    border-radius: .5rem;
    font-size: 5rem;
    font-family: 'Press Start 2P', cursive;
    cursor: pointer;
  }

  button:hover {
    background: transparent;
  }

</style>
