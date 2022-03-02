import { sign } from 'jsonwebtoken';
const { JWT_SECRET_TOKEN } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '5m',
};

const generateToken = ({ id }) => sign({ id }, JWT_SECRET_TOKEN, jwtConfig);

export default generateToken;
