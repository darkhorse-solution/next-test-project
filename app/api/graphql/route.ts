import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../../graphql/schemas';
import { resolvers } from '../../../graphql/resolvers';
import connectToDatabase from '../../../lib/mongoose';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectToDatabase();
    return {};
  },
});

const startServer = apolloServer.start();

export async function POST(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
