import { useCustomer } from '../../../magicPlace/talons/useCustomer';
const {
  CustomerList,
  Customer,
  UpdateCustomer,
  DeleteCustomer,
  CreateCustomer,
  SignInCustomer,
} = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customer: async (_, { id }) => await Customer({ id }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomer: async (_, args) => await UpdateCustomer({ args }),
    deleteCustomer: async (_, { id }) => await DeleteCustomer({ id }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
