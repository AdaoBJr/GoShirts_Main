import { useCustomer } from '../../../magicPlace/talons/useCustomer';
const {
  CustomerList,
  Customer,
  UpdateCustomerById,
  DeleteCustomerByEmail,
  CreateCustomer,
  SignInCustomer,
} = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customer: async (_, { email }) => await Customer({ email }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomerById: async (_, { hash: id, data }) =>
      await UpdateCustomerById({ id, data }),
    deleteCustomerByEmail: async (_, { email }) => await DeleteCustomerByEmail({ email }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
