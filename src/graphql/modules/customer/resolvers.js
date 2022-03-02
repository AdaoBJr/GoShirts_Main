import { useCustomer } from '../../../magicPlace/talons/useCustomer';
const {
  CustomerList,
  Customer,
  CustomerTokens,
  UpdateCustomer,
  DeleteCustomer,
  CreateCustomer,
  SignInCustomer,
} = useCustomer();

export default {
  Customer: {
    tokens: async ({ id }) => await CustomerTokens({ id }),
  },
  Query: {
    customerList: async () => await CustomerList(),
    customer: async (_, { id }) => await Customer({ id }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomer: async (_, args) => await UpdateCustomer({ args }),
    deleteCustomer: async (_, { email }) => await DeleteCustomer({ email }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
