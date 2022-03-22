import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { decodeToken } from '.';
import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';
import ApiError, { expiredSession, tokenInvalidOrUnath } from '../errors';
import checkTokenExists from './checkTokenExists';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30m',
};

const BREAK_POINT = 60 * 5;

const generateRefreshToken = async ({ token }) => {
  const tokens = await checkTokenExists({ token });
  if (!tokens.length || tokens.length > 1) ApiError(tokenInvalidOrUnath);

  const { id, exp } = decodeToken({ token });

  const now = dayjs().format();
  const expirateDate = dayjs(dayjs.unix(exp).format());
  const HAS_TIME = expirateDate.diff(now, 'seconds');

  if (HAS_TIME > BREAK_POINT) return token;
  if (HAS_TIME <= 0) return ApiError(expiredSession);
  if (BREAK_POINT >= HAS_TIME > 0) {
    const newToken = sign({ id }, JWT_SECRET, jwtConfig);

    const allTokens = [...tokens[0].items, newToken];
    const items = allTokens.filter((item) => item !== token);
    const customerToken = { userId: id, items, count: items.length };

    await CustomerTokensRepository.findOneAndUpdate({ userId: id }, customerToken, {
      new: true,
    });
    return newToken;
  }
};

export default generateRefreshToken;
