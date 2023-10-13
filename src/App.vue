<template>
  <router-view />
</template>

<script>

export default {
  name: "App",
  components: {},
};
</script>

<style>
body {
  margin: 0;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
