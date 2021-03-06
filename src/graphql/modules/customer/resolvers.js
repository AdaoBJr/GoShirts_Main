import {
  useCustomer,
  useCustomerAddress,
  useCustomerWishlist,
} from '../../../magicPlace/talons/customer';

const {
  CustomerList,
  CustomerInfo,
  CustomerTokens,
  UpdateCustomer,
  DeleteCustomer,
  CreateCustomer,
  SignInCustomer,
  SignOutCustomer,
  RequestResetPwd,
  ResetPassword,
  ResetEmail,
  RequestResetEmail,
  UpdateAvatarImage,
  SubscribeNewsletter,
  UnsubscribeNewsletter,
} = useCustomer();

const {
  CustomerAddress,
  CreateCustomerAddress,
  UpdateCustomerAddress,
  DeleteCustomerAddress,
} = useCustomerAddress();

const {
  CustomerWishList,
  Wishlist,
  AddProductsToWishlist,
  RemoveProductsToWishlist,
  ProductWishlist,
} = useCustomerWishlist();

export default {
  Customer: {
    tokens: async ({ id }) => await CustomerTokens({ id }),
    address: async ({ id }) => await CustomerAddress({ id }),
    wishlist: async ({ id }) => await Wishlist({ id }),
  },
  Wish: {
    product: async (parent) => await ProductWishlist({ parent }),
  },
  Query: {
    customerList: async () => await CustomerList(),
    customerInfo: async (_, { id, token }) => await CustomerInfo({ id, token }),
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
    addProductsToWishlist: async (_, args) => await AddProductsToWishlist({ args }),
    removeProductsToWishlist: async (_, args) => await RemoveProductsToWishlist({ args }),
    requestResetPwd: async (_, { email }) => await RequestResetPwd({ email }),
    requestResetEmail: async (_, { email }) => await RequestResetEmail({ email }),
    resetPassword: async (_, { data }) => await ResetPassword({ data }),
    resetEmail: async (_, { data }) => await ResetEmail({ data }),
    updateAvatarImage: async (_, args) => await UpdateAvatarImage({ args }),
    subscribeNewsletter: async (_, { email }) => await SubscribeNewsletter({ email }),
    unsubscribeNewsletter: async (_, { email }) => await UnsubscribeNewsletter({ email }),
  },
};
