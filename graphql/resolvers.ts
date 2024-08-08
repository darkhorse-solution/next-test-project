import User from '../models/User';

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_parent: any, args: { id: string }) => {
      return await User.findById(args.id);
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: { name: string; email: string }) => {
      const user = new User({
        name: args.name,
        email: args.email,
      });
      await user.save();
      return user;
    },
  },
};

export default resolvers;
