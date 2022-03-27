import isAuth from './tools/isAuth';

const checkAuth = {
  Query: {
    customerInfo: isAuth,
    wishlist: isAuth,
  },
  Mutation: {
    updateCustomer: isAuth,
    createCustomerAddress: isAuth,
    updateCustomerAddress: isAuth,
    deleteCustomerAddress: isAuth,
    signOutCustomer: isAuth,
    createProduct: isAuth,
    addProductsToWishlist: isAuth,
    removeProductsToWishlist: isAuth,
    updateAvatarImage: isAuth,
  },
};

export default checkAuth;
