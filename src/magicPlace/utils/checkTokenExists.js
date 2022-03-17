import { CustomerTokensRepository } from '../../repositories/mongodb/models/customer';

const checkTokenExists = async ({ token }) =>
  await CustomerTokensRepository.findOne({ token }).exec();

export default checkTokenExists;
