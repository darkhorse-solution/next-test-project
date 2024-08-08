import { userResolvers } from './users';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolvers]);
