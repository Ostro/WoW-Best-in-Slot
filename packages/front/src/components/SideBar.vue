<template>
  <div class="sidebar">
    <div class="sidebar-items">
      <div
        :class="['sidebar-item', { selected: selectedCharacter === char.id }]"
        v-for="char in characters"
        :key="char.id"
        @click.prevent="selectCharacter(char.id)"
      >
        <span class="item-content">{{ char.name }}</span>
      </div>
    </div>
    <BaseButton class="logout-button" text="Logout" :onClick="logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import router from '../router';
import { selectCharacterMutation } from '../localState/mutations';
import { selectedCharacterQuery } from '../localState/queries';
import BaseButton from './BaseButton.vue';
import { logout } from '../utils/auth';

interface Character {
  id: string;
  name: string;
}

export default defineComponent({
  name: 'Sidebar',
  components: {
    BaseButton,
  },
  props: {
    characters: Array as PropType<Array<Character>>,
  },
  setup: () => {
    const { mutate: setSelectedCharacter } = useMutation(
      selectCharacterMutation,
    );
    const { result: selectedCharacterRes } = useQuery(selectedCharacterQuery);

    const selectedCharacter = useResult(selectedCharacterRes);

    function selectCharacter(id: string): void {
      setSelectedCharacter({ characterId: id });
    }

    return {
      selectedCharacter,
      selectCharacter,
      logout: () => {
        logout(router);
      },
    };
  },
});
</script>

<style lang='scss'>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 50px 0;
  padding: 50px 0;
  border-right: $lightBlack solid 3px;
}

.sidebar-items {
  margin: 5px 30px;

}

.sidebar-item {
  position: relative;
  display: flex;
  font-size: 24px;
  padding: 20px 30px;
  overflow: hidden;
}

.item-content::after {
  content: "";
  position: absolute;
  background-image: $buttonGradient;
  height: 8px;
  width: 100%;
  bottom: 5px;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar-item:hover {
  color: $lightBlack;
}

.selected,
.sidebar-item:hover {
  .item-content::after {
    transform: translateX(0%);
  }
}

.logout-button {
  margin: 5px 30px;
}
</style>
