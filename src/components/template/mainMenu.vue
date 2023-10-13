<template>
  <div class="main-menu">
    <h2 class="title">Um clipe uma música</h2>
    <p class="subtitle">Clips from: Taylor Swift</p>
    <router-link to="/game">
      <buttonComp label="Jogar" normal />
    </router-link>
  </div>
</template>

<script>
import buttonComp from "../buttonComp.vue";
export default {
  name: "mainMenu",
  components: {
    buttonComp,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Croissant+One&family=Recursive&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Croissant+One&family=Freckle+Face&family=Recursive&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-menu {
  border: 2px solid #000;
  width: 600px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3C7087;
}

.title {
  font-family: "Freckle Face";
  font-size: 2.3rem;
}

.subtitle {
  margin-top: 5px;
  font-family: "Freckle Face";
  font-size: 1.4rem;
}
</style>