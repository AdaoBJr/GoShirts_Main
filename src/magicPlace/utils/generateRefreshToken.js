import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { decodeToken } from '.';

const { JWT_SECRET_TOKEN } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '15m',
};

const BREAK_POINT = 1;

const generateRefreshToken = ({ token }) => {
  const { id, exp } = decodeToken({ token });

  const now = dayjs().format();
  const expirateDate = dayjs(dayjs.unix(exp).format());
  const hasTime = expirateDate.diff(now, 'minutes');

  if (hasTime > BREAK_POINT) return token;
  return sign({ id }, JWT_SECRET_TOKEN, jwtConfig);
};

export default generateRefreshToken;
