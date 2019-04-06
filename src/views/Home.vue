<template>
  <div class="home">
    <h1>Welcome to Peaky Blinders Grand Prix</h1>
    <h1>Players: {{players.length}}</h1>
    <div class="">
      <ul>
        <li v-for="horse of horses" v-bind:key="horse['.key']">{{horse.color}}{{horse.selected}}</li>
      </ul>
    </div>
    <div class="" v-if="players.length < 4">
      <input type="text" name="username" v-model="username" placeholder="Insert username">
      <button @click="joinRace()">Join Race</button>
    </div>
    <div class="" v-else>
      Race is full...
    </div>
  </div>
</template>

<script>
import { playersRef, horsesRef } from '../firebase'

export default {
  name: 'home',
  data(){
    return {
      username: '',
    }
  },
  firebase: {
    players: playersRef,
    horses: horsesRef
  },
  methods: {
    joinRace(){
      let randomIndex =  Math.floor(Math.random() * (3 - 0 + 1)) + 0
      while(this.horses[randomIndex].selected){
        console.log(randomIndex)
        randomIndex =  Math.floor(Math.random() * (3 - 0 + 1)) + 0
      }
      console.log(this.horses[randomIndex]['.key'])
      horsesRef.child(this.horses[randomIndex]['.key']).update({
        selected: true
      })
      playersRef.push({
        username: this.username,
        horse: this.horses[randomIndex]['.key']
      }).then(response => {
          console.log(`Success entering rece\nWith response ${response}`)
          this.$router.push({name: 'select-horse'})
      }).catch(error => {
          console.error("Error adding document: ", error)
      })
    }
  }
}
</script>
