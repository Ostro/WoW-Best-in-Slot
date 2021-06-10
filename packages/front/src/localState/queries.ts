import { gql } from '@apollo/client';

export const selectedCharacterQuery = gql`
  query GetSelectedCharacter {
    selectedCharacter @client
  }
`;

export const selectedGearListQuery = gql`
  query GetSelectedGearList {
    selectedGearList @client
  }
`;
