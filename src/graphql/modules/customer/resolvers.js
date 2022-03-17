import { useCustomer, useCustomerAddress } from '../../../magicPlace/talons/customer';

const {
  CustomerList,
  Customer,
  CustomerTokens,
  UpdateCustomer,
  DeleteCustomer,
  CreateCustomer,
  SignInCustomer,
  SignOutCustomer,
} = useCustomer();

const { CustomerAddress, CreateCustomerAddress, UpdateCustomerAddress } =
  useCustomerAddress();

export default {
  Customer: {
    tokens: async ({ id }) => await CustomerTokens({ id }),
    address: async ({ id }) => await CustomerAddress({ id }),
  },
  Query: {
    customerList: async () => await CustomerList(),
    customer: async (_, { id, token }) => await Customer({ id, token }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    createCustomerAddress: async (_, args) => await CreateCustomerAddress({ args }),
    updateCustomerAddress: async (_, args) => await UpdateCustomerAddress({ args }),
    updateCustomer: async (_, args) => await UpdateCustomer({ args }),
    deleteCustomer: async (_, { email }) => await DeleteCustomer({ email }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
    signOutCustomer: async (_, args) => await SignOutCustomer({ args }),
  },
};
