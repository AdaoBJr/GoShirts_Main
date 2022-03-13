import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { decodeToken } from '.';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';
import ApiError, { expiredSession } from '../errors';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30m',
};

const BREAK_POINT = 60;

const generateRefreshToken = async ({ token }) => {
  const { id, exp } = decodeToken({ token });

  const now = dayjs().format();
  const expirateDate = dayjs(dayjs.unix(exp).format());
  const HAS_TIME = expirateDate.diff(now, 'seconds');

  if (HAS_TIME > BREAK_POINT) return token;
  if (HAS_TIME <= 0) return ApiError(expiredSession);
  if (BREAK_POINT >= HAS_TIME > 0) {
    const newToken = sign({ id }, JWT_SECRET, jwtConfig);
    const data = { userId: id, token: newToken };
    await CustomerTokensRepository.findOneAndUpdate({ token }, data, { new: true });
    return newToken;
  }
};

export default generateRefreshToken;
