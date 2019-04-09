<template lang="html">
  <div class="all_user">
    <div class="big_user">
      <h1>First Place</h1>
      <div class="user">
        <img src="./assets/img/horse.gif" alt="horse">
        <h3>Gabriel</h3>
      </div>
    </div>
    <div class="big_user">
      <h1>Second Place</h1>
      <div class="user">
        <img src="./assets/img/dog.gif" alt="dog">
        <h3>Jorge</h3>
      </div>
    </div>
    <div class="big_user">
      <h1>Third Place</h1>
      <div class="user">
        <img src="./assets/img/sonic.gif" alt="sonic">
        <h3>Miguel</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
template {
  height: 100vh;
  background-image: url(../img/space.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
  font-family: 'Press Start 2P', cursive;
}


.all_user {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  bottom: 0;
  height: 100vh;
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

.big_user {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.big_user h1 {
  color: white;
}

#home {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: auto;
}

</style>
