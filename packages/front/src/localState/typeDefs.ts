import { gql } from '@apollo/client';

export default gql`
  extend type Query {
    selectedCharacter: String,
    selectedGearList: String,
  }

  extend type Mutation {
    selectCharacter(characterId: String): Boolean
  }
`;
