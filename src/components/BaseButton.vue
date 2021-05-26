<template>
  <button :type="type" @click="onClick">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
    type: {
      type: String,
      default: 'button',
    },
    onClick: Function,
  },
});
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  border: $primary-color 0.125em solid;
  border-radius: 0.5em;
  color: $white;
  background-color: $primary-color;
  text-align: center;
  padding: 1em 1em;
  transition: all 0.1s linear;
  width: auto;
}

button:hover,
button:focus {
  background-color: $lighten-primary;
  border-color: $lighten-primary;
}
</style>
