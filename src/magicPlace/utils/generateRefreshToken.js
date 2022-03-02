import { sign } from 'jsonwebtoken';
const { JWT_SECRET_REFRESH_TOKEN } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30d',
};

const generateRefreshToken = ({ id }) =>
  sign({ data: { id } }, JWT_SECRET_REFRESH_TOKEN, jwtConfig);

export default generateRefreshToken;
