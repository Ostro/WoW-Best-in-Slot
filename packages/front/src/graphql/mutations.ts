import { gql } from '@apollo/client';

export const addGearMutation = gql`
  mutation($gear: GearUncheckedCreateInput!) {
    createGear(data: $gear) {
      id
      name
      location
      gearListId
      __typename
    }
  }
`;

export const removeGearMutation = gql`
  mutation removeGearMutation($id: String!) {
    deleteGear(where: { id: $id }) {
      id
    }
  }
`;
