<template lang="html">
  <div class="content">
    <div class="">
      <ul>
        <li v-for="player of players" v-bind:key="player['.key']">{{player.username}}--{{player.horse}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playersRef } from '../firebase'

export default {
  data(){
    return {
      username: '',
    }
  },
  firebase: {
    players: playersRef,
  },
  methods: {
    deletePlayer(key){
      playersRef.child(key).remove()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
