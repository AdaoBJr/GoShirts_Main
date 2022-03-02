import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const checkTokenExists = async ({ id }) =>
  await CustomerTokensRepository.findOne({ userId: id }).exec();

export default checkTokenExists;
