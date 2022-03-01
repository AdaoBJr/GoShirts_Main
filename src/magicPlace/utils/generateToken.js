import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = ({ email }) => ({
  token: sign({ data: { email } }, JWT_SECRET, jwtConfig),
});

export { generateToken };
