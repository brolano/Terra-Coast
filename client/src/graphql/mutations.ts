import { gql } from '@apollo/client';

export const ADD_SUBSCRIBER = gql`
  mutation AddSubscriber($name: String, $email: String!) {
    addSubscriber(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;
