import ApiError, {
  tokenInvalidOrUnath,
  tokenIsMissing,
  dataEntryIncorrect,
} from '../../errors';
import { checkTokenExists, checkUserIdExists, decodeToken } from '../../utils';

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

  const userExists = await checkUserIdExists({ id });
  if (!userExists) ApiError(dataEntryIncorrect);

  Object.assign(args, { id, token });
  return await resolve(parent, args, context, info);
};

export default isAuth;
