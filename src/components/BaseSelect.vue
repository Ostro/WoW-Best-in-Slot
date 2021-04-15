<template>
  <div tabindex="0" class="input-container">
    <div class="input-label">
      <span
        :class="['input-label-content', { selected: !!value }]"
        >{{ name }}</span
      >
    </div>
    <div class="input-value" v-show="option.value === value">
      {{ option.name }}
    </div>
    <div class="input-options">
      <div
        class="input-options-item"
        v-for="opt in options"
        :key="opt.value"
        @click.prevent="selectOption(opt)"
      >
        {{ opt.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

interface Option {
  name?: string;
  value?: string;
}

export default defineComponent({
  props: {
    name: String,
    value: String,
    options: {
      type: Array as PropType<Option[]>,
    },
  },
  emits: ['update:value'],
  setup: (props, { emit }) => {
    const option = ref<Option>({
      name: undefined,
      value: undefined,
    });

    function selectOption(opt: Option) {
      emit('update:value', opt.value);
      option.value = opt;
    }

    return {
      option,
      selectOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  width: 100%;
  height: 50px;
  cursor: pointer;
}

.input-label-content {
  position: absolute;
  left: 0px;
  bottom: 15px;
  transition: all 0.3s ease;
}

.input-container:focus-within .input-label-content,
.input-label-content.selected {
  transform: translateY(-150%);
  color: darken($primary-color, 25%);
  font-size: 14px;
}

.input-value {
  position: absolute;
  bottom: 10px;
  left: 5px;
}

.input-options {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 15px;
  left: 5px;
  border: $black 2px solid;
  background-color: $primary-color;
  width: 250px;
  z-index: 10;
  transition: transform 0.3s ease;
  transform: translateY(100%);
  opacity: 0;
  visibility: hidden;
  height: 0%;
  overflow: auto;
}

.input-options-item {
  display: none;
  height: 25px;
  &:hover {
    background-color: $lighten-primary;
  }
}

.input-container:focus-within .input-label-content {
  transform: translateY(-150%);
  color: darken($primary-color, 25%);
  font-size: 14px;
}

.input-container:focus-within .input-options {
  opacity: 1;
  visibility: visible;
  height: auto;
  max-height: 190px;
  transform: translateY(0);
  .input-options-item {
    display: block;
  }
}
</style>
