<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup: () => {
    const router = useRouter();

    onMounted(() => {
      if (!localStorage.getItem('authHeader')) {
        router.push({ name: 'Login' });
      }
    });
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
  color: $onLightBG;
}

button {
  cursor: pointer;
}
</style>
