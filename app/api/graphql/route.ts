import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from 'apollo-server-micro';
import connectToDatabase from '../../../lib/mongoose';
import typeDefs from '../../../graphql/schema';
import resolvers from '../../../graphql/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectToDatabase();
    return {};
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req as any, NextResponse as any);
}
