<template>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Name</th>
        <th>Location</th>
        <th class="action-icon"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="gear in gearset" :key="gear.id">
        <th>{{ getSlotName(gear.slot) }}</th>
        <th>{{ gear.name }}</th>
        <th>{{ getDungeonName(gear.location) }}</th>
        <th class="action-icon">
          <button @click.prevent="removeGear(gear.id)">
            <i class="far fa-trash-alt red"></i>
          </button>
        </th>
      </tr>
      <tr>
        <th>
          <BaseSelect
            v-model:value="newItem.slot"
            :options="gearSlots"
            name="Item Slot"
          />
        </th>
        <th>
          <BaseInput inputType="text" name="Item Name" v-model:input="newItem.name" />
        </th>
        <th>
          <BaseSelect
            v-model:value="newItem.location"
            :options="dungeonList"
            name="Dungeon List"
          />
        </th>
        <th class="action-icon">
          <button @click.prevent="addGear">
            <i class="far fa-check-circle green"></i>
          </button>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { selectedGearListQuery } from '../localState/queries';
import { getGearListQuery } from '../graphql/queries';
import { dungeonList, getDungeonName } from '../types/dungeons';
import { gearSlots, getSlotName } from '../types/gear';
import { addGearMutation, removeGearMutation } from '../graphql/mutations';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';

export default defineComponent({
  components: {
    BaseInput,
    BaseSelect,
  },
  setup() {
    const { result: getSelectedGearList } = useQuery(selectedGearListQuery);
    const gearListId = useResult(getSelectedGearList);

    const gearlistArgs = ref({
      gearListId,
    });

    const { result: getGearlist } = useQuery(getGearListQuery, gearlistArgs);
    const gearset = useResult(getGearlist, []);

    const newItem = ref({
      slot: undefined,
      name: undefined,
      location: undefined,
    });

    const { mutate: saveGear } = useMutation(addGearMutation, {
      update: (cache, { data: { createGear } }) => {
        const cached: any = cache.readQuery({
          query: getGearListQuery,
          variables: gearlistArgs.value,
        });
        cache.writeQuery({
          query: getGearListQuery,
          variables: gearlistArgs.value,
          data: {
            gears: [...cached.gears, createGear],
          },
        });
      },
    });

    async function addGear(): Promise<void> {
      if (
        !newItem.value.slot
        || !newItem.value.name
        || !newItem.value.location
      ) {
        alert('Missing some fields in new item');
        return;
      }

      await saveGear({
        gear: {
          ...newItem.value,
          gearListId: gearListId.value,
        },
      });

      newItem.value = {
        slot: undefined,
        name: undefined,
        location: undefined,
      };
    }

    const { mutate: delGear } = useMutation(removeGearMutation, {
      update: (cache, { data: { deleteGear } }) => {
        const cached: any = cache.readQuery({
          query: getGearListQuery,
          variables: gearlistArgs.value,
        });

        cache.writeQuery({
          query: getGearListQuery,
          variables: gearlistArgs.value,
          data: {
            gears: cached.gears.filter(
              (gear: any) => gear.id !== deleteGear.id,
            ),
          },
        });
      },
    });

    async function removeGear(id: string): Promise<void> {
      await delGear({ id });
    }

    return {
      dungeonList,
      getDungeonName,
      gearSlots,
      getSlotName,
      gearset,
      gearListId,
      newItem,
      addGear,
      removeGear,
    };
  },
});
</script>

<style scoped lang="scss">
table {
  background-color: transparent;
  border-collapse: collapse;
  margin-bottom: 50px;
}

th {
  padding: 20px 30px;
  height: 50px;
  text-align: left;

  &.action-icon {
    padding: 10px;
  }
}

thead {
  color: $onDarkBG;
  background: $primary-color;
}

tbody {
  tr:nth-child(even) {
    background: $lighten-primary;
  }

  button {
    background: none;
    border: none;
    outline: none;

    .red {
      color: red;
    }
    .red:hover {
      color: lightcoral;
    }

    .green {
      color: green;
    }
    .green:hover {
      color: lightgreen;
    }

    i {
      font-size: 24px;
    }
  }
}
</style>
