import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Subscriber {
    _id: ID!
    name: String
    email: String!
  }

  type Query {
    subscribers: [Subscriber]
  }

  type Mutation {
    addSubscriber(name: String, email: String!): Subscriber
  }
`;

export default typeDefs;
