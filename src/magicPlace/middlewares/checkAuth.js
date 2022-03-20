import isAuth from './tools/isAuth';

const checkAuth = {
  Query: {
    customer: isAuth,
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
  },
};

export default checkAuth;
