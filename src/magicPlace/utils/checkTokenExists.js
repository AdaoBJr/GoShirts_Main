import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';

const checkTokenExists = async ({ token }) =>
  await CustomerTokensRepository.find({ items: { $eq: token } });

export default checkTokenExists;
