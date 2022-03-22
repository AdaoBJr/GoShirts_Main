import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '3h',
};

const generateTokenResetEmail = async ({ id: userId }) => {
  await CustomerTokensRepository.deleteMany({ userId });
  const token = sign({ id: userId }, JWT_SECRET, jwtConfig);
  const customerToken = { userId, items: [token], count: 1 };

  await CustomerTokensRepository.create(customerToken);

  return token;
};

export default generateTokenResetEmail;
