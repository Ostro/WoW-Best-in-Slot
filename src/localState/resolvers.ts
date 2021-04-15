import { selectedCharacterQuery, selectedGearListQuery } from './queries';

export default {
  Mutation: {
    selectCharacter(_: any, { characterId }: { characterId: string }, { cache }: any): void {
      cache.writeQuery({ query: selectedCharacterQuery, data: { selectedCharacter: characterId } });
    },
    selectGearList(_: any, { gearListId }: { gearListId: string }, { cache }: any): void {
      cache.writeQuery({ query: selectedGearListQuery, data: { selectedGearList: gearListId } });
    },
  },
};
