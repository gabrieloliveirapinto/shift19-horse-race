<template>
  <div class="home">
    <h1>Peaky Blinders Grand Prix</h1>
    <div class="insert" v-if="!this.current">
      <h1>Your Name!</h1>
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


<style lang="css" scoped>
  template {
    height: 100vh;
    background-image: url(../img/wallpaper.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 16px;
    font-family: 'Press Start 2P', cursive;
  }

  * {
    margin: 0;
  }

  .insert {
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }

  .insert h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  input {
    width: 20rem;
    height: 3rem;
    padding: .5rem;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: .5rem;
    font-size: 2rem;
    font-family: 'Press Start 2P', cursive;
  }

  input[type=submit] {
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }

  input[type=text]:hover, input[type=text]:active {
    background: rgba(255, 255, 255);
  }

  input[type=submit]:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
