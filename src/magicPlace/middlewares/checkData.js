import hasData from './tools/hasData';

const checkData = {
  Query: {},
  Mutation: {
    createCustomer: hasData,
    createCustomerAddress: hasData,
    updateCustomerAddress: hasData,
    updateCustomer: hasData,
    deleteCustomerAddress: hasData,
    signInCustomer: hasData,
    signOutCustomer: hasData,
    addProductsToWishlist: hasData,
    removeProductsToWishlist: hasData,
  },
};

export default checkData;
