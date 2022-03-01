import { verify } from 'jsonwebtoken';
import CustomerRepository from '../../repositories/mongodb/models/customer';

const { JWT_SECRET } = process.env;

const isAuth = async (resolve, parent, args, context, info) => {
  const authHeader = context.authorization;
  if (!authHeader) throw new Error('Token is missing.');

  let token = '';
  const hasBearer = authHeader.includes('Bearer');

  if (hasBearer) [, token] = authHeader.split(' ');
  if (!hasBearer) token = authHeader;

  const { data } = verify(token, JWT_SECRET);
  const userExists = await CustomerRepository.findOne({ email: data.email }).exec();
  if (!userExists) throw new Error('Invalid token or unauthorized user.');

  Object.assign(args, data);
  return await resolve(parent, args, context, info);
};

const checkAuthentication = {
  Query: {
    customer: isAuth,
  },
  Mutation: {
    updateCustomerById: isAuth,
    deleteCustomerByEmail: isAuth,
  },
};

export { checkAuthentication };
