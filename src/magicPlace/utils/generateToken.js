import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = ({ id }) => ({
  token: sign({ data: { id } }, JWT_SECRET, jwtConfig),
});

export default generateToken;
