import { userResolvers } from './user';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([userResolvers]);
