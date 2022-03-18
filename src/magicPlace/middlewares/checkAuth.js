import isAuth from './tools/isAuth';

const checkAuth = {
  Query: {
    customer: isAuth,
    productList: isAuth,
  },
  Mutation: {
    updateCustomer: isAuth,
    createCustomerAddress: isAuth,
    updateCustomerAddress: isAuth,
    deleteCustomerAddress: isAuth,
    signOutCustomer: isAuth,
    createProduct: isAuth,
  },
};

export default checkAuth;
