import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

const generateToken = ({ id }) => sign({ id }, JWT_SECRET, jwtConfig);

export default generateToken;
