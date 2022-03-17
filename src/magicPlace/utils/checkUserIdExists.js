import { CustomerRepository } from '../../repositories/mongodb/models/customer';

const checkUserIdExists = async ({ id }) =>
  await CustomerRepository.findOne({ id }).exec();

export default checkUserIdExists;
