import { useCustomer } from '../../../magicPlace/talons/useCustomer';
const {
  CustomerList,
  CustomerById,
  UpdateCustomerById,
  DeleteCustomerById,
  CreateCustomer,
  SignInCustomer,
} = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customerById: async (_, { hash: id }) => await CustomerById({ id }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomerById: async (_, { hash: id, data }) =>
      await UpdateCustomerById({ id, data }),
    deleteCustomerById: async (_, { hash: id }) => await DeleteCustomerById({ id }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
