import { gql } from '@apollo/client';

export const selectCharacterMutation = gql`
  mutation SelectCharacter($characterId: String!) {
    selectCharacter(characterId: $characterId) @client
  }
`;

export const selectGearListMutation = gql`
  mutation SelectGearList($gearListId: String!) {
    selectGearList(gearListId: $gearListId) @client
  }
`;
