import User from '../../models/User';

export const userResolvers = {
  Query: {
    users: async () => await User.find({}),
  },
  Mutation: {
    createUser: async (_: any, { name, email }: { name: string, email: string }) => {
      console.log(name, email);
        
      const user = new User({ name, email });
      await user.save();
      return user;
    },
  },
};