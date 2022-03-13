import CustomerRepository from '../../repositories/mongodb/models/customer';
import ApiError, { tokenInvalidOrUnath, tokenIsMissing } from '../errors';
import { checkTokenExists, decodeToken } from '../utils';

const isAuth = async (resolve, parent, args, context, info) => {
  const authHeader = context.authorization;
  if (!authHeader) ApiError(tokenIsMissing);

  let token = '';
  const hasBearer = authHeader.includes('Bearer');

  if (hasBearer) [, token] = authHeader.split(' ');
  if (!hasBearer) token = authHeader;

  const tokenExists = await checkTokenExists({ token });
  if (!tokenExists) ApiError(tokenInvalidOrUnath);

  const { id } = decodeToken({ token });

  const userExists = await CustomerRepository.findOne({ id }).exec();
  if (!userExists) ApiError(tokenInvalidOrUnath);

  Object.assign(args, { id, token });
  return await resolve(parent, args, context, info);
};

const checkAuthentication = {
  Query: {
    customer: isAuth,
  },
  Mutation: {
    updateCustomer: isAuth,
    signOutCustomer: isAuth,
  },
};

export { checkAuthentication };
