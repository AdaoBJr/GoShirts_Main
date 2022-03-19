import { CustomerRepository } from '../../repositories/mongodb/models/customer';

const checkUserIdExists = async ({ id, userId }) =>
  await CustomerRepository.findOne({ id: id || userId }).exec();

export default checkUserIdExists;
