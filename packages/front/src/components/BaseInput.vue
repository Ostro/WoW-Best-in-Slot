<template>
  <div class="input-container">
    <input
      class="base-input"
      :type="inputType"
      :value="input"
      required
      autocomplete="off"
      @input="$emit('update:input', $event.target.value)"
    />
    <div class="label-input">
      <span class="label-content">{{name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    input: String,
    name: String,
    inputType: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:input'],
});
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
}

.label-input {
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
  border-bottom: $black 1px solid;
}

.label-input::after {
  content: "";
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  border-bottom: darken($primary-color, 25%) 1px solid;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.label-content {
  position: absolute;
  left: 0px;
  bottom: 10px;
  transition: all 0.3s ease;
}

.base-input {
  position: relative;
  color: $onLightBG;
  background-color: transparent;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  padding-top: 20px;
  outline: none;
  cursor: pointer;
}

.base-input:focus + .label-input .label-content,
.base-input:valid + .label-input .label-content {
  transform: translateY(-125%);
  color: darken($primary-color, 25%);
  font-size: 14px;
}

.base-input:focus + .label-input::after,
.base-input:valid + .label-input::after {
  transform: translateX(0%);
}
</style>
