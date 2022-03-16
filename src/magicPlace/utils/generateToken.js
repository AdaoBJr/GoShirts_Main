import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

const generateToken = async ({ id: userId }) => {
  await CustomerTokensRepository.deleteMany({ userId });
  const token = sign({ id: userId }, JWT_SECRET, jwtConfig);
  const customerToken = { userId, token };
  await CustomerTokensRepository.create(customerToken);

  return token;
};

export default generateToken;
