<template>
  <div class="panel-container">
    <div class="tabs">
      <div
        v-for="gearList in gearLists"
        :class="['tabs-item', { selected: gearListId === gearList.id }]"
        :key="gearList.id"
        @click="selectGearList(gearList.id)"
      >
        {{ gearList.name }}
      </div>
    </div>
    <Gearset/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import Gearset from './Gearset.vue';
import { getGearlistsQuery } from '../graphql/queries';
import {
  selectedCharacterQuery,
  selectedGearListQuery,
} from '../localState/queries';
import { selectGearListMutation } from '../localState/mutations';

export default defineComponent({
  components: {
    Gearset,
  },
  setup() {
    const { result: selectedCharRes } = useQuery(selectedCharacterQuery);
    const characterId = useResult(selectedCharRes);
    const getGearListArgs = ref({
      characterId,
    });

    const { result: getSelectedGearList } = useQuery(selectedGearListQuery);
    const gearListId = useResult(getSelectedGearList);
    const { mutate: setSelectedGearList } = useMutation(selectGearListMutation);

    const { result: gearListsRes } = useQuery(
      getGearlistsQuery,
      getGearListArgs,
    );

    const gearLists = useResult(gearListsRes, [], (data) => {
      setSelectedGearList({ gearListId: data.gearLists[0].id });
      return data.gearLists;
    });

    function selectGearList(id: string): void {
      setSelectedGearList({ gearListId: id });
    }

    return {
      gearLists,
      gearListId,
      selectGearList,
    };
  },
});
</script>

<style scoped lang="scss">
.panel-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 50px;
}

.tabs {
  display: flex;
  height: 100%;
  max-height: 150px;
  min-height: 150px;
  justify-content: space-around;
  align-items: center;
}

.tabs-item {
  display: flex;
  flex-direction: column;

  height: 50px;
  width: 300px;
  font-size: 20px;

  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 10px;

  color: $white;
  background-image: $buttonGradient;
}

.tabs-item.selected {
  color: $onLightBG;
  border: $onLightBG 2px solid;
  background-color: transparent;
  background-image: none;
}
.tabs-item.selected:hover {
  color: $lightBlack;
  border: $lightBlack 2px solid;
}

.tabs-item:hover {
  font-size: 24px;
  transition: font-size 0.1s ease-in-out;
}

</style>
