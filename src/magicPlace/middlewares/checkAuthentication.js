import { verify } from 'jsonwebtoken';
import Customer from '../../repositories/mongodb/models/customer';

const { JWT_SECRET } = process.env;

const isAuth = async (resolve, parent, args, context, info) => {
  const authHeader = context.authorization;
  if (!authHeader) throw new Error('Token is missing.');

  let token = '';
  const hasBearer = authHeader.includes('Bearer');

  if (hasBearer) [, token] = authHeader.split(' ');
  if (!hasBearer) token = authHeader;

  const { data: email } = verify(token, JWT_SECRET);
  const userExists = await Customer.findOne({ email }).exec();
  if (!userExists) throw new Error('Invalid token or unauthorized user.');

  return await resolve(parent, args, context, info);
};

const checkAuthentication = {
  Query: {
    customerById: isAuth,
  },
  Mutation: {
    updateCustomerById: isAuth,
    deleteCustomerById: isAuth,
  },
};

export { checkAuthentication };
