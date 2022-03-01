const isAuth = async (resolve, parent, args, context, info) => {
  if (!context.authorization) throw new Error('Not authorized');

  return await resolve(parent, args, context, info);
};

const checkAuthentication = {
  Query: {
    customerList: isAuth,
  },
  Mutation: {
    updateCustomerById: isAuth,
  },
};

export { checkAuthentication };
