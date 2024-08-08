import { userTypeDefs } from './user';
import { gql } from 'apollo-server-micro';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
];
