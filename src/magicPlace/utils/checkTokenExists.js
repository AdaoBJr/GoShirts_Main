import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';

const checkTokenExists = async ({ token, userId }) => {
  if (token) return await CustomerTokensRepository.find({ items: { $eq: token } });
  if (userId) return await CustomerTokensRepository.findOne({ userId }).exec();
};

export default checkTokenExists;
