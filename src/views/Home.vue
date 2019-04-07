<template>
  <div class="home">
    <h1>Peaky Blinders Grand Prix</h1>
    <div v-if="!this.current">
      <input type="text" name="username" v-model="username" placeholder="Insert username">
      <input type="date" name="birth_date" v-model="birth_date">
      <button @click="login()">Login</button>
    </div>
    <div v-else>
      <h2>Create Race</h2>
      <label for="amount">Nº de Perguntas:</label>
      <input type="number"  name="amount" v-model="amount">
      <label for="level">Dificuldade:</label>
      <input type="text"  name="levle" v-model="level">
      <button type="button" name="button" @click="createRace()">Create</button>
      <h2>Join Race</h2>
      <input type="text"  name="race_id" v-model="race_id">
      <button type="button" name="button" @click="joinRace()">Join</button>
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
      birth_date: '',
      race_id: '',
      amount: 10,
      level: ''
    }
  },
  computed: {
    ...mapState('users', ['current', 'currentKey', 'myGameKey']),
  },
  methods: {
    ...mapActions('users', ['setUser', 'createGame', 'joinGame']),
    login(){
      this.setUser({
        username: this.username,
        birth_date: this.birth_date,
      })
    },
    createRace(){
      console.log("Creating race...")
      this.createGame({
        amount: this.amount,
        level: this.level
      })
    },
    joinRace(){
      console.log(`Joining race with key: ${this.race_id}...`)
      this.joinGame({
        key: this.race_id,
        user_id: this.currentKey
      })
    }
  }
}
</script>
