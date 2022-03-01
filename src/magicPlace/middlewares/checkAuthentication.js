import { verify } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const isAuth = async (resolve, parent, args, context, info) => {
  const authHeader = context.authorization;
  const hasBearer = authHeader.includes('Bearer');
  let token = '';

  if (!authHeader) throw new Error('Token is missing.');
  if (hasBearer) [, token] = authHeader.split(' ');
  if (!hasBearer) token = authHeader;

  try {
    const decoded = verify(token, JWT_SECRET);
    console.log(decoded);
  } catch (error) {
    throw new Error('Invalid Token!');
  }

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
