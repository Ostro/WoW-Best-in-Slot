<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './views/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
});
</script>

<style lang='scss'>
html,
body,
#app {
  font-family: "Poppins", sans-serif;
  background-color: $white;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

div {
  color: $onLightBG
}

button {
  cursor: pointer;
}
</style>
