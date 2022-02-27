import Customer from '../../../repositories/mongodb/models/customer';

export default {
  Query: {
    customerList: async () => await Customer.find(),
  },
  Mutation: {
    createCustomer: async (_, { data }) => {
      const customer = await Customer.create(data);
      return { customer };
    },
  },
};
