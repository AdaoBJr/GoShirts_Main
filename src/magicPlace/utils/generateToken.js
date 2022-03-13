import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

const generateToken = async ({ id }) => {
  const token = sign({ id }, JWT_SECRET, jwtConfig);
  const customerToken = { userId: id, token };
  await CustomerTokensRepository.create(customerToken);

  return token;
};

export default generateToken;
