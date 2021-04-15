<template>
  <div class="container">
    <Sidebar :characters="characters" />
    <PanelTab />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import Sidebar from '../components/SideBar.vue';
import PanelTab from '../components/PanelTab.vue';
import { getCharactersQuery } from '../graphql/queries';
import { selectCharacterMutation } from '../localState/mutations';

export default defineComponent({
  name: 'Home',
  components: {
    Sidebar,
    PanelTab,
  },
  setup() {
    const { mutate: selectCharacter } = useMutation(selectCharacterMutation);
    const { result: allCharacters } = useQuery(getCharactersQuery);

    const characters = useResult(allCharacters, [], (data) => {
      selectCharacter({ characterId: data.characters[0].id });
      return data.characters;
    });

    return { characters };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}
</style>
