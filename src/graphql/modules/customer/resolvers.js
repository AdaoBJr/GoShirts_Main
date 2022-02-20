const customerDb = [];

export default {
  Query: {
    customerList: async () => customerDb,
  },
  Mutation: {
    createCustomer: async (_, { data }) => {
      customerDb.push(data);
      return data;
    },
  },
};
