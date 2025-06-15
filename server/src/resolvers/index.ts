import Subscriber from '../models/Subscriber';

export const resolvers = {
  Query: {
    subscribers: async () => await Subscriber.find()
  },
  Mutation: {
    addSubscriber: async (_: any, { name, email }: { name: string, email: string }) => {
      return await Subscriber.create({ name, email });
    }
  }
};
