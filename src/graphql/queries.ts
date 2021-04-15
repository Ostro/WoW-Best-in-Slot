import { gql } from '@apollo/client';

export const getGearlistsQuery = gql`
  query getGearlists($characterId: String!) {
    gearLists(where: { characterId: { equals: $characterId } }) {
      id
      name
    }
  }
`;

export const getCharactersQuery = gql`
  query getCharacters {
    characters {
      id
      name
    }
  }
`;

export const getGearListQuery = gql`
  query getGearList($gearListId: String!) {
    gears(where: { gearListId: { equals: $gearListId } }) {
      id
      name
      slot
      location
    }
  }
`;
