import {
  useCustomer,
  useCustomerAddress,
  useCustomerWishlist,
} from '../../../magicPlace/talons/customer';

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

const {
  CustomerAddress,
  CreateCustomerAddress,
  UpdateCustomerAddress,
  DeleteCustomerAddress,
} = useCustomerAddress();

const { CustomerWishList, Wishlist, AddProductsToWishlist, RemoveProductsToWishlist } =
  useCustomerWishlist();

export default {
  Customer: {
    tokens: async ({ id }) => await CustomerTokens({ id }),
    address: async ({ id }) => await CustomerAddress({ id }),
    wishlist: async ({ id }) => await Wishlist({ id }),
  },
  Query: {
    customerList: async () => await CustomerList(),
    customer: async (_, { id, token }) => await Customer({ id, token }),
    customerWishList: async () => await CustomerWishList(),
    wishlist: async (_, { id, token }) => await Wishlist({ id, token }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    createCustomerAddress: async (_, args) => await CreateCustomerAddress({ args }),
    updateCustomerAddress: async (_, args) => await UpdateCustomerAddress({ args }),
    updateCustomer: async (_, args) => await UpdateCustomer({ args }),
    deleteCustomer: async (_, { email }) => await DeleteCustomer({ email }),
    deleteCustomerAddress: async (_, args) => await DeleteCustomerAddress({ args }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
    signOutCustomer: async (_, args) => await SignOutCustomer({ args }),
    addProductsToWishlist: async (_, args) => AddProductsToWishlist({ args }),
    removeProductsToWishlist: async (_, args) => RemoveProductsToWishlist({ args }),
  },
};
