import { sign } from 'jsonwebtoken';
const { JWT_SECRET_TOKEN } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = ({ id }) => sign({ data: { id } }, JWT_SECRET_TOKEN, jwtConfig);

export default generateToken;
