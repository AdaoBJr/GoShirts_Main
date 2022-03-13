import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const checkTokenExists = async ({ token }) =>
  await CustomerTokensRepository.findOne({ token }).exec();

export default checkTokenExists;
