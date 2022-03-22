import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';
import decodeToken from './decodeToken';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = async ({ userId }) => {
  const CustomerToken = await CustomerTokensRepository.findOne({ userId }).exec();

  const checkTokens =
    CustomerToken &&
    CustomerToken.items
      .map((token) => {
        const decodedToken = decodeToken({ token, genNewToken: true });
        return decodedToken.expired ? false : token;
      })
      .filter((item) => item);

  const token = sign({ id: userId }, JWT_SECRET, jwtConfig);

  let items = [];
  if (!checkTokens) items.push(token);
  if (checkTokens) items = [...checkTokens, token];

  const customerToken = { userId, items, count: items.length };

  if (checkTokens) {
    await CustomerTokensRepository.findOneAndUpdate({ userId }, customerToken, {
      new: true,
    });
  } else {
    await CustomerTokensRepository.create(customerToken);
  }

  return token;
};

export default generateToken;
