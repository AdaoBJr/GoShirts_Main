import { verify } from 'jsonwebtoken';
import CustomerRepository from '../../repositories/mongodb/models/customer';
import ApiError, { tokenInvalidOrUnath, tokenIsMissing } from '../errors';

const { JWT_SECRET_TOKEN } = process.env;

const isAuth = async (resolve, parent, args, context, info) => {
  const authHeader = context.authorization;
  if (!authHeader) ApiError(tokenIsMissing);

  let token = '';
  const hasBearer = authHeader.includes('Bearer');

  if (hasBearer) [, token] = authHeader.split(' ');
  if (!hasBearer) token = authHeader;

  const { data } = verify(token, JWT_SECRET_TOKEN);
  const userExists = await CustomerRepository.findOne({ id: data.id }).exec();
  if (!userExists) ApiError(tokenInvalidOrUnath);

  Object.assign(args, data);
  return await resolve(parent, args, context, info);
};

const checkAuthentication = {
  Query: {
    customer: isAuth,
  },
  Mutation: {
    updateCustomer: isAuth,
  },
};

export { checkAuthentication };
